#!/bin/bash

# Script to install IFC OpenShell from source
# This should be run inside the Docker container when IFC processing is needed

echo "Installing IFC OpenShell dependencies..."

# Install system dependencies
apt-get update && apt-get install -y \
    git \
    cmake \
    build-essential \
    libboost-all-dev \
    libopencascade-dev \
    liboce-foundation-dev \
    liboce-modeling-dev \
    liboce-visualization-dev \
    liboce-ocaf-dev \
    libswscale-dev \
    libavformat-dev \
    libavcodec-dev \
    libfreetype6-dev \
    libxt-dev \
    libxrender-dev \
    libxrandr-dev \
    libgl1-mesa-dev \
    libglu1-mesa-dev \
    libxmu-dev \
    libxi-dev \
    libtiff5-dev \
    libpng-dev \
    libjpeg-dev \
    libgif-dev \
    libxerces-c-dev \
    libxml2-dev \
    libxslt1-dev \
    libqt5opengl5-dev \
    qt5-default

echo "Cloning IFC OpenShell repository..."
git clone https://github.com/IfcOpenShell/IfcOpenShell.git /tmp/ifcopenshell

echo "Building IFC OpenShell..."
cd /tmp/ifcopenshell
git checkout v0.6.0
mkdir build && cd build
cmake -DIFCUSE_SYSTEM_OPENCASCADE=ON -DIFCUSE_SYSTEM_BOOST=ON ..
make -j$(nproc)
make install

echo "Installing Python bindings..."
cd /tmp/ifcopenshell/src/ifcopenshell-python
python setup.py install

echo "Cleaning up..."
cd /
rm -rf /tmp/ifcopenshell

echo "IFC OpenShell installation complete!" 