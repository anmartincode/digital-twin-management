try:
    import ifcopenshell
    import ifcopenshell.geom
    IFC_AVAILABLE = True
except ImportError:
    IFC_AVAILABLE = False
    print("Warning: ifcopenshell not available. BIM processing will be limited.")

import numpy as np
import json
import os
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, asdict
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class BIMElement:
    """Represents a BIM element with its properties and geometry"""
    id: str
    name: str
    type: str
    global_id: str
    geometry: Dict[str, Any]
    properties: Dict[str, Any]
    material: Optional[Dict[str, Any]] = None
    location: Optional[Dict[str, Any]] = None

@dataclass
class BIMModel:
    """Represents a complete BIM model"""
    id: str
    name: str
    version: str
    elements: List[BIMElement]
    metadata: Dict[str, Any]
    bounding_box: Dict[str, Any]

class BIMProcessor:
    """Handles IFC file processing and BIM model extraction"""
    
    def __init__(self):
        if not IFC_AVAILABLE:
            logger.warning("IFC OpenShell not available. BIM processing will be limited.")
            self.settings = None
        else:
            self.settings = ifcopenshell.geom.settings()
            self.settings.set(self.settings.USE_WORLD_COORDS, True)
            self.settings.set(self.settings.INCLUDE_CURVES, True)
            self.settings.set(self.settings.APPLY_DEFAULT_MATERIALS, True)
    
    def process_ifc_file(self, file_path: str) -> BIMModel:
        """
        Process an IFC file and extract BIM model data
        
        Args:
            file_path: Path to the IFC file
            
        Returns:
            BIMModel object containing all extracted data
        """
        if not IFC_AVAILABLE:
            raise ImportError("IFC OpenShell is not available. Please install ifcopenshell to process IFC files.")
        
        try:
            logger.info(f"Processing IFC file: {file_path}")
            
            # Load IFC file
            ifc_file = ifcopenshell.open(file_path)
            
            # Extract model metadata
            metadata = self._extract_metadata(ifc_file)
            
            # Extract elements
            elements = self._extract_elements(ifc_file)
            
            # Calculate bounding box
            bounding_box = self._calculate_bounding_box(elements)
            
            # Create BIM model
            model = BIMModel(
                id=metadata.get('project_name', 'unknown'),
                name=metadata.get('project_name', 'Unknown Project'),
                version=metadata.get('schema_version', 'unknown'),
                elements=elements,
                metadata=metadata,
                bounding_box=bounding_box
            )
            
            logger.info(f"Successfully processed IFC file. Found {len(elements)} elements.")
            return model
            
        except Exception as e:
            logger.error(f"Error processing IFC file: {str(e)}")
            raise
    
    def _extract_metadata(self, ifc_file) -> Dict[str, Any]:
        """Extract metadata from IFC file"""
        metadata = {
            'schema_version': ifc_file.schema,
            'project_name': 'Unknown Project',
            'building_name': 'Unknown Building',
            'floor_count': 0,
            'total_area': 0,
            'units': 'meters'
        }
        
        try:
            # Extract project information
            projects = ifc_file.by_type('IfcProject')
            if projects:
                project = projects[0]
                metadata['project_name'] = getattr(project, 'Name', 'Unknown Project')
                metadata['project_description'] = getattr(project, 'Description', '')
                
                # Extract building information
                buildings = ifc_file.by_type('IfcBuilding')
                if buildings:
                    building = buildings[0]
                    metadata['building_name'] = getattr(building, 'Name', 'Unknown Building')
                    metadata['building_description'] = getattr(building, 'Description', '')
                    
                    # Count floors
                    floors = ifc_file.by_type('IfcBuildingStorey')
                    metadata['floor_count'] = len(floors)
                    
                    # Calculate total area
                    total_area = 0
                    for floor in floors:
                        area = self._calculate_floor_area(floor)
                        total_area += area
                    metadata['total_area'] = total_area
                    
        except Exception as e:
            logger.warning(f"Error extracting metadata: {str(e)}")
        
        return metadata
    
    def _extract_elements(self, ifc_file) -> List[BIMElement]:
        """Extract all elements from IFC file"""
        elements = []
        
        # Define element types to extract
        element_types = [
            'IfcWall', 'IfcSlab', 'IfcBeam', 'IfcColumn', 'IfcDoor', 'IfcWindow',
            'IfcRoof', 'IfcStair', 'IfcRamp', 'IfcFurnishingElement', 'IfcSanitaryTerminal',
            'IfcFlowTerminal', 'IfcDistributionElement', 'IfcElectricalElement'
        ]
        
        for element_type in element_types:
            try:
                type_elements = ifc_file.by_type(element_type)
                for element in type_elements:
                    bim_element = self._process_element(element)
                    if bim_element:
                        elements.append(bim_element)
            except Exception as e:
                logger.warning(f"Error processing {element_type}: {str(e)}")
        
        return elements
    
    def _process_element(self, element) -> Optional[BIMElement]:
        """Process individual IFC element"""
        try:
            # Extract basic properties
            element_id = str(element.id())
            name = getattr(element, 'Name', f'{element.is_a()}_{element_id}')
            element_type = element.is_a()
            global_id = getattr(element, 'GlobalId', '')
            
            # Extract geometry
            geometry = self._extract_geometry(element)
            
            # Extract properties
            properties = self._extract_properties(element)
            
            # Extract material
            material = self._extract_material(element)
            
            # Extract location
            location = self._extract_location(element)
            
            return BIMElement(
                id=element_id,
                name=name,
                type=element_type,
                global_id=global_id,
                geometry=geometry,
                properties=properties,
                material=material,
                location=location
            )
            
        except Exception as e:
            logger.warning(f"Error processing element {element.id()}: {str(e)}")
            return None
    
    def _extract_geometry(self, element) -> Dict[str, Any]:
        """Extract geometry from IFC element"""
        geometry_data = {
            'vertices': [],
            'faces': [],
            'edges': [],
            'type': 'unknown'
        }
        
        try:
            # Create shape representation
            shape = ifcopenshell.geom.create_shape(self.settings, element)
            
            if shape:
                # Extract vertices
                vertices = shape.verts
                geometry_data['vertices'] = [
                    [vertices[i], vertices[i+1], vertices[i+2]] 
                    for i in range(0, len(vertices), 3)
                ]
                
                # Extract faces
                faces = shape.faces
                geometry_data['faces'] = [
                    [faces[i], faces[i+1], faces[i+2]] 
                    for i in range(0, len(faces), 3)
                ]
                
                # Extract edges
                edges = shape.edges
                geometry_data['edges'] = [
                    [edges[i], edges[i+1]] 
                    for i in range(0, len(edges), 2)
                ]
                
                geometry_data['type'] = 'mesh'
                
        except Exception as e:
            logger.warning(f"Error extracting geometry: {str(e)}")
        
        return geometry_data
    
    def _extract_properties(self, element) -> Dict[str, Any]:
        """Extract properties from IFC element"""
        properties = {}
        
        try:
            # Extract basic attributes
            for attr in element.get_info():
                if attr not in ['id', 'type']:
                    value = getattr(element, attr, None)
                    if value is not None:
                        properties[attr] = str(value)
            
            # Extract property sets
            if hasattr(element, 'IsDefinedBy'):
                for definition in element.IsDefinedBy:
                    if definition.is_a('IfcRelDefinesByProperties'):
                        property_set = definition.RelatingPropertyDefinition
                        if property_set.is_a('IfcPropertySet'):
                            for prop in property_set.HasProperties:
                                properties[prop.Name] = prop.NominalValue.wrappedValue
                                
        except Exception as e:
            logger.warning(f"Error extracting properties: {str(e)}")
        
        return properties
    
    def _extract_material(self, element) -> Optional[Dict[str, Any]]:
        """Extract material information from IFC element"""
        try:
            if hasattr(element, 'HasAssociations'):
                for association in element.HasAssociations:
                    if association.is_a('IfcRelAssociatesMaterial'):
                        material_select = association.RelatingMaterial
                        if material_select.is_a('IfcMaterial'):
                            return {
                                'name': material_select.Name,
                                'description': getattr(material_select, 'Description', ''),
                                'category': getattr(material_select, 'Category', '')
                            }
        except Exception as e:
            logger.warning(f"Error extracting material: {str(e)}")
        
        return None
    
    def _extract_location(self, element) -> Optional[Dict[str, Any]]:
        """Extract location information from IFC element"""
        try:
            if hasattr(element, 'ObjectPlacement'):
                placement = element.ObjectPlacement
                if placement.is_a('IfcLocalPlacement'):
                    location = placement.RelativePlacement.Location
                    if location:
                        return {
                            'x': float(location.Coordinates[0]),
                            'y': float(location.Coordinates[1]),
                            'z': float(location.Coordinates[2])
                        }
        except Exception as e:
            logger.warning(f"Error extracting location: {str(e)}")
        
        return None
    
    def _calculate_floor_area(self, floor) -> float:
        """Calculate floor area"""
        try:
            area = 0
            if hasattr(floor, 'ContainsElements'):
                for rel in floor.ContainsElements:
                    for element in rel.RelatedElements:
                        if element.is_a('IfcSlab'):
                            # Calculate slab area
                            shape = ifcopenshell.geom.create_shape(self.settings, element)
                            if shape:
                                # Simple area calculation (can be improved)
                                area += 100  # Placeholder
            return area
        except Exception as e:
            logger.warning(f"Error calculating floor area: {str(e)}")
            return 0
    
    def _calculate_bounding_box(self, elements: List[BIMElement]) -> Dict[str, Any]:
        """Calculate bounding box for all elements"""
        if not elements:
            return {'min': [0, 0, 0], 'max': [0, 0, 0]}
        
        all_vertices = []
        for element in elements:
            if element.geometry.get('vertices'):
                all_vertices.extend(element.geometry['vertices'])
        
        if not all_vertices:
            return {'min': [0, 0, 0], 'max': [0, 0, 0]}
        
        vertices_array = np.array(all_vertices)
        min_coords = vertices_array.min(axis=0).tolist()
        max_coords = vertices_array.max(axis=0).tolist()
        
        return {
            'min': min_coords,
            'max': max_coords,
            'size': [max_coords[i] - min_coords[i] for i in range(3)]
        }
    
    def export_to_json(self, model: BIMModel, output_path: str) -> None:
        """Export BIM model to JSON format"""
        try:
            # Convert model to dictionary
            model_dict = asdict(model)
            
            # Write to JSON file
            with open(output_path, 'w') as f:
                json.dump(model_dict, f, indent=2, default=str)
            
            logger.info(f"Model exported to: {output_path}")
            
        except Exception as e:
            logger.error(f"Error exporting model to JSON: {str(e)}")
            raise
    
    def get_element_statistics(self, model: BIMModel) -> Dict[str, Any]:
        """Get statistics about the BIM model"""
        element_types = {}
        total_elements = len(model.elements)
        
        for element in model.elements:
            element_type = element.type
            element_types[element_type] = element_types.get(element_type, 0) + 1
        
        return {
            'total_elements': total_elements,
            'element_types': element_types,
            'unique_types': len(element_types),
            'model_size': {
                'width': model.bounding_box['size'][0],
                'height': model.bounding_box['size'][1],
                'depth': model.bounding_box['size'][2]
            }
        }

# Example usage
if __name__ == "__main__":
    processor = BIMProcessor()
    
    # Process IFC file
    ifc_path = "sample.ifc"
    if os.path.exists(ifc_path):
        try:
            model = processor.process_ifc_file(ifc_path)
            
            # Export to JSON
            processor.export_to_json(model, "bim_model.json")
            
            # Print statistics
            stats = processor.get_element_statistics(model)
            print("BIM Model Statistics:")
            print(json.dumps(stats, indent=2))
        except ImportError as e:
            print(f"Error: {e}")
    else:
        print(f"IFC file not found: {ifc_path}") 