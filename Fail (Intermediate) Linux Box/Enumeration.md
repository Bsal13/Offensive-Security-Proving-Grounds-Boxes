#### -Per googling port 873 enumeration I found "hacktricks" website showing to type "nmap -sV --script "rsync-list-modules" -p <PORT> <IP>" to enumerate shares:
	
![](../Pasted%20Images/Pasted%20image%2020220525154818.png)
	

#### -Found share "fox" typing "nmap -sV --script "rsync-list-modules" -p 873 192.168.143.126":
	
![](../Pasted%20Images/Pasted%20image%2020220525154930.png)
	
	#Rsync
	
#### -Per googling port 873 enumeration I found the below web page showing how to list files/directory from rsync server
	
![](../Pasted%20Images/Pasted%20image%2020220525155037.png)
	
![](../Pasted%20Images/Pasted%20image%2020220525155124.png)
	
#### -Typed "rsync -r 192.168.143.126::fox " and found the below files/directories showing user "fox" home directory and then downloaded all files/directories onto local machine by typing "rsync -av fox@192.168.143.126::fox/ ."
	
![](../Pasted%20Images/Pasted%20image%2020220525155239.png)
	
![](../Pasted%20Images/Pasted%20image%2020220525155304.png)
	
#### -Found nothing interesting reading the files
	
#### -Tested if I can upload files users "fox" home directory by typing "echo "hello world" > testfile.txt" and typing "rsync testfile.txt -r 192.168.143.126::fox" to see if it uploaded to fox's home directory. And I found I can:
	
![](../Pasted%20Images/Pasted%20image%2020220525155438.png)
	
#### -The directions how to find out how to do this was found on the previous website showing the following: 
	
![](../Pasted%20Images/Pasted%20image%2020220525155556.png)
	
#### -Googled "port 873 enumeration" and found the following page from hacktricks showing how to copy all files from your  local machine to the rsync server:
	
![](../Pasted%20Images/Pasted%20image%2020220525155730.png)