**_Latest update: 2022-9-17 22:46:42_**

---

**常用链接**

-   https://github.com/trending/
-   https://github.com/ruanyf/weekly/

**查找资源 tips**

-   百科大全 &emsp;&emsp;&emsp;`awesome xxx`
-   示例 &emsp;&emsp;&emsp;&emsp;&emsp;`xxx sample`
-   教程 &emsp;&emsp;&emsp;&emsp;&emsp;`xxx tutorial`
-   空项目架子 &emsp;&emsp;`xxx starter / xxx boilerplate`

> `git`开始

```
// 初始化仓库
git version
git config --global user.name "Laputa"
git config --global user.email "Laputa1729@163.com"
git init
```

```
git add test.txt  // 把单个文件添加到git版本控制系统中
git commit
// 进入 vim 终端编辑器，让你填写提交说明，按 a 或者 i 进入编辑模式，输入说明
// 写完说明后，按 esc 退出编辑模式 :wq (write, quit) 保存并退出
git log --stat  // 查看提交日志
```

```
// 提交当前目录内的【全部】文件，跳过 vim ，直接填写提交说明
git add -A
git commit -m "第2次提交"
```

> `git`分支

```
git checkout -b <branchname>  // 以【当前所在分支】为基础，新建一个分支
git branch                    // 列举出所有分支
git checkout <branchname>     // 切换到指定分支
git merge <branchname>        // 合并分支到 main 分支
git branch -D <branchname>    // 删除指定分支
```

> `git`与`github`远程仓库

```
// 把本地仓库推到远程 github 仓库
git remote add origin https://github.com/Laputa1729/github-relevant.git
git branch -M main       // master 分支改名为 main
git push -u origin main  // 开始推送

git push  // 推送
git pull  // 拉取
```

-   `fatal: unable to access 'https://github.com/Laputa1729/github-relevant.git/': SSL certificate problem: unable to get local issuer certificate`  
    远程服务器上的 SSL 证书未经过第三方机构认证。

    -   **办法：** `git config --global http.sslverify false`，这行命令的影响范围限系统当前用户。

-   `! [rejected]`  
    `error: failed to push some refs to 'https://github.com/Laputa1729/github-relevant.git'`  
    创建 github 远程仓库，若勾选了`README`或者`LICENSE`，远程仓库会帮你做一次初始提交，这时，本地和远程都有提交记录，故`git push -u origin main`被拒绝。

    -   **办法 1：** `git pull --rebase origin main`，然后再进行上传：`git push -u origin main`。
    -   **办法 2：** 以后创建 github 仓库什么都别勾，保持空仓库，所需依赖文件本地添加再上传。
