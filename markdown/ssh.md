
#ssh issue 
  - 记录登录管理repository的问题

    1.生成密匙

        ssh-keygen -t rsa -C "15*****6@qq.com"   
        
    2.验证是否连接成功

        git bash error:
        fatal: unable to access 'https://github.com/april-snowing/my-study-node/': Could not resolve host: gitlab.com
        ssh -T git@github.com
        note: T要大写

    3.查看log (找出原因)

        ssh -vvv git@github.com
        OpenSSH_for_Windows_8.1p1, LibreSSL 3.0.2
        debug3: Failed to open file:C:/Users/asus/.ssh/config error:2
        debug3: Failed to open file:C:/ProgramData/ssh/ssh_config error:2

    4.在相应的路径添加这两个配置文件

        Host *
        IdentityFile=C:\Users\asus\.ssh/id_rsa 
        HostkeyAlgorithms=ssh-rsa 

    5.Access denied

        凭据管理器，网址一定要到自己的账户那一层级
        https://github.com/april-snowing
