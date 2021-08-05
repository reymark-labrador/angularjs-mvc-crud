# angularjs-mvc-crud
1. Update your connection settings in Web.config
   ```sh
    <connectionStrings>
      <add name="StringDbContext" connectionString="Server=DB_SERVER;Initial Catalog=DATABASE;Persist Security Info=False;User Id=sa;Password=DB_PASSWORD;" providerName="System.Data.SqlClient" />
    </connectionStrings>
   ```
2. Run migratrion in package manager command line
   ```sh
   Update-Database
   ```
3. Run application
