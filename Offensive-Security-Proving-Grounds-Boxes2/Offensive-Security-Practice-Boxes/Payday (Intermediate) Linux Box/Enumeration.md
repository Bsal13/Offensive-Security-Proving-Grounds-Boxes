#### --Found directory "/admin/login.php" via nikto scan and advises "may allow user admin accounts to be inserted without proper authentication. Attempt to log in with user 'test' password 'test' to verify."

#### -Navigated to the admin login page and attempted to login in with credentials "test" "test" and "admin" "password" then "admin" "admin" and I was able to login: 

![](../Pasted%20Images/Pasted%20image%2020220521183226.png)

![](../Pasted%20Images/Pasted%20image%2020220521183259.png)

![](../Pasted%20Images/Pasted%20image%2020220521183401.png)

#CS-cart

#### -I also checked the users in the cscart database and found the following users: 

admin, admin 

customer, customer 

#### -Navigated to "upgrade center" and found the current version of CS-Cart it was running was "version 1.3.3": 

![](../Pasted%20Images/Pasted%20image%2020220521184055.png)

![](../Pasted%20Images/Pasted%20image%2020220521184207.png)

#### -Ran "searchsploit CS-Cart" and found the following "Authenticated RCE" exploit: 

![](../Pasted%20Images/Pasted%20image%2020220521185015.png)

#### -Googled "CS-Cart 1.3.3 Authenticated RCE Github" and found the following link and navigated to it and showed the following steps: 

![](../Pasted%20Images/Pasted%20image%2020220521185108.png)

![](../Pasted%20Images/Pasted%20image%2020220521185153.png)



