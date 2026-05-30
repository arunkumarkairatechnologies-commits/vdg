"""
Create Admin Superuser for E-Commerce Admin Panel
Creates admin user with username: admin, password: admin123
"""

import os
import sys
import django

# Add backend to path
backend_path = os.path.join(os.path.dirname(__file__), '..', '..', 'ecommerce_backend')
sys.path.insert(0, backend_path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_backend.settings')
django.setup()

from django.contrib.auth.models import User

def create_admin():
    username = 'admin'
    email = 'admin@fashion.com'
    password = 'admin123'
    
    try:
        if User.objects.filter(username=username).exists():
            print("\n" + "="*50)
            print(f"Admin user '{username}' already exists!")
            print("="*50)
            print("\nLogin credentials:")
            print(f"Username: {username}")
            print(f"Password: {password}")
            print("\nAdmin Panel: http://localhost:8000/admin")
            print("="*50 + "\n")
        else:
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            print("\n" + "="*50)
            print("SUCCESS: Admin user created!")
            print("="*50)
            print("\nLogin credentials:")
            print(f"Username: {username}")
            print(f"Password: {password}")
            print(f"Email: {email}")
            print("\nAdmin Panel: http://localhost:8000/admin")
            print("\nNext steps:")
            print("1. Start server:")
            print("   cd ../ecommerce_backend")
            print("   python manage.py runserver")
            print("\n2. Open admin panel:")
            print("   http://localhost:8000/admin")
            print("="*50 + "\n")
            
    except Exception as e:
        print("\n" + "="*50)
        print("ERROR: Failed to create admin user")
        print("="*50)
        print(f"Error message: {e}")
        print("\nTroubleshooting:")
        print("1. Make sure database is created")
        print("2. Make sure migrations are applied")
        print("3. Run: python manage.py migrate")
        print("="*50 + "\n")

if __name__ == "__main__":
    create_admin()
