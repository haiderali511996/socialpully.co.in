"""Project package.

cPanel provides MySQL rather than PostgreSQL. `mysqlclient` needs a compiler
and MySQL headers, which shared hosting rarely has, so PyMySQL (pure Python)
is the practical driver there. Registering it as MySQLdb lets Django's mysql
backend use it unchanged.

No-op when PyMySQL is not installed, which is the case on PostgreSQL and
SQLite deployments.
"""
try:
    import pymysql
except ImportError:
    pass
else:
    pymysql.install_as_MySQLdb()
