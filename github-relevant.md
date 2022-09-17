**_Last update: 2022-9-17 17:57:40_**

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

> 分支

```
git checkout -b <branchname>  // 以【当前所在分支】为基础，新建一个分支
git branch                    // 列举出所有分支
git checkout <branchname>     // 切换到指定分支
git merge <branchname>        // 合并分支到 main 分支
git branch -D <branchname>    // 删除指定分支
```

在 bbb 分支写了这行话。
