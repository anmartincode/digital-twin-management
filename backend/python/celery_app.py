"""
Celery configuration for Digital Twin Management System
"""

import os
from celery import Celery
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create Celery instance
celery_app = Celery(
    'digital_twin_management',
    broker=os.getenv('REDIS_URL', 'redis://localhost:6379/0'),
    backend=os.getenv('REDIS_URL', 'redis://localhost:6379/0'),
    include=['celery_tasks.tasks']
)

# Celery configuration
celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes
    task_soft_time_limit=25 * 60,  # 25 minutes
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=1000,
    broker_connection_retry_on_startup=True,
)

# Optional: Configure task routes
celery_app.conf.task_routes = {
    'celery_tasks.tasks.process_bim_file': {'queue': 'bim_processing'},
    'celery_tasks.tasks.process_sensor_data': {'queue': 'sensor_data'},
    'celery_tasks.tasks.generate_reports': {'queue': 'reports'},
}

if __name__ == '__main__':
    celery_app.start() 