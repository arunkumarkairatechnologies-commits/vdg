"""
Setup MySQL Database for E-Commerce Admin Panel
Creates 'fashion_db' database in XAMPP MySQL
"""

import pymysql

def setup_database():
    try:
        print("Connecting to MySQL...")
        connection = pymysql.connect(
            host='127.0.0.1',
            user='root',
            password='',
            port=3306
        )
        
        cursor = connection.cursor()
        
        print("Creating database 'fashion_db'...")
        cursor.execute("CREATE DATABASE IF NOT EXISTS fashion_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
        
        print("\n" + "="*50)
        print("SUCCESS: Database 'fashion_db' created!")
        print("="*50)
        print("\nNext steps:")
        print("1. Run migrations:")
        print("   cd ../ecommerce_backend")
        print("   python manage.py migrate")
        print("\n2. Create admin user:")
        print("   cd ../ecommerce_admin")
        print("   python scripts/create_admin.py")
        print("="*50 + "\n")
        
        cursor.close()
        connection.close()
        
    except Exception as e:
        print("\n" + "="*50)
        print("ERROR: Failed to create database")
        print("="*50)
        print(f"Error message: {e}")
        print("\nTroubleshooting:")
        print("1. Make sure XAMPP MySQL is running")
        print("2. Check MySQL is on port 3306")
        print("3. Check MySQL user is 'root' with no password")
        print("="*50 + "\n")

if __name__ == "__main__":
    setup_database()
