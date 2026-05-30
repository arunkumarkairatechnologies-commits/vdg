"""
Reset MySQL Database for E-Commerce Admin Panel
Drops and recreates 'fashion_db' database
WARNING: This will delete all data!
"""

import pymysql

def reset_database():
    print("\n" + "="*50)
    print("WARNING: This will delete all data!")
    print("="*50)
    confirm = input("\nType 'YES' to continue: ")
    
    if confirm != 'YES':
        print("Reset cancelled.")
        return
    
    try:
        print("\nConnecting to MySQL...")
        connection = pymysql.connect(
            host='127.0.0.1',
            user='root',
            password='',
            port=3306
        )
        
        cursor = connection.cursor()
        
        print("Dropping old database...")
        cursor.execute("DROP DATABASE IF EXISTS fashion_db")
        
        print("Creating fresh database...")
        cursor.execute("CREATE DATABASE fashion_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
        
        print("\n" + "="*50)
        print("SUCCESS: Database reset complete!")
        print("="*50)
        print("\nNext steps:")
        print("1. Run migrations:")
        print("   cd ../ecommerce_backend")
        print("   python manage.py migrate")
        print("\n2. Create admin user:")
        print("   cd ../ecommerce_admin")
        print("   python scripts/create_admin.py")
        print("\n3. Start server:")
        print("   cd ../ecommerce_backend")
        print("   python manage.py runserver")
        print("="*50 + "\n")
        
        cursor.close()
        connection.close()
        
    except Exception as e:
        print("\n" + "="*50)
        print("ERROR: Failed to reset database")
        print("="*50)
        print(f"Error message: {e}")
        print("\nTroubleshooting:")
        print("1. Make sure XAMPP MySQL is running")
        print("2. Check MySQL is on port 3306")
        print("="*50 + "\n")

if __name__ == "__main__":
    reset_database()
