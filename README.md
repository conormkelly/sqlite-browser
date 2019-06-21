# Get all tables

SELECT 
    name
FROM 
    sqlite_master 
WHERE 
    type ='table' AND 
    name NOT LIKE 'sqlite_%';


# Table info
PRAGMA table_info(%tablename%);

# Todo / Ideas
* History feature
* View tables and info
