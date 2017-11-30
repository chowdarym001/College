# How to use this `ras-styleguide` repo as a subtree within your git project

## ADDING PROJECT AND SUBTREE

### If this is your first time working on a new project (i.e. as PPC):

#### First, `cd` to folder you want to use (or create a new one and cd to that folder). We'll call this the `project` folder.

Use this command only if you created a new local folder for your project.
```shell
git init
```

Then,
```shell
git remote add origin git@cegitrepo-ob-1p.deltakedu.corp:collegiseducation/ras-ppc-template.git

git pull origin master
```

#### Second, add `ras-styleguide` remote as subtree:

Even if the subtree has already been added to the repository, **you will need a copy of it on your local environment**. These two commands will add a copy of the subtree to your local environment.

```shell
git remote add ras-styleguide git@cegitrepo-ob-1p.deltakedu.corp:collegiseducation/ras-styleguide.git

git subtree add --prefix=prime/ ras-styleguide master
```

Run this command to ensure that you have **both repositories** in your project.
```shell
git remote -v
```

Run these commands to pull the latest changes to **both repositories**.
```shell
git pull origin master

git subtree pull --prefix=prime/ ras-styleguide master
```
---
## MAKING AND COMMITTING CHANGES

#### Third, making changes and pushing changes to repository:

The `-u` is only on the first push to set upstream = track changes.
```shell
git push -u origin master
```

#### If you are making changes only to the style guide subtree repo:
If you're working in the singular `ras-styleguide` repo, push the changes normally.
```shell
git push origin master
```

If you're working in the `prime` folder, push changes:
```shell
git subtree push --prefix=prime/ ras-styleguide master
```

#### If you are making changes only to the project folder [eg. ras-ppc-template]:

Push the changes normally to the project repo.
```shell
git push origin master
```

#### If you make changes to both the the project files and the styleguide files in the `prime` folder:

Before pushing to the styleguide subtree, cd to the parent directory (if not there already)

```shell
cd ../
```

Then push the changes normally to the project repo, and to the styleguide subtree
```shell
git push origin master

git subtree push --prefix=prime/ ras-styleguide master
```

---
## TROUBLESHOOTING ERRORS/MESSAGES

#### If you are trying to push the changes to either project or subtree and receive the error `Working tree has modifications. Cannot add.`, do the following:

```shell
get status
```
If there are modified files, do a `git add .` command, and a `git commit -m "message here"` command and write your message.

Then try to push to project repo and subtree again.

#### If you are trying to pull updates for the `prime` subtree and receive the message `Merging {commit #} Please enter a commit message to explain why this merge is necessary`, know that it is not an error:
It's not a Git error message; it's the editor as git uses your default editor.

 To solve, do the following:

1. press `i`
2. write your merge message
3. press `esc`
4. write `:wq`
5. then press enter
6. push to subtree
---
## Resources on Git subtrees

https://medium.com/@v/git-subtrees-a-tutorial-6ff568381844#.lct5h4rd2

https://www.youtube.com/watch?v=E7YWeRFHpXg

---

# How to use Fabricator

> _fabricate_ - to make by assembling parts or sections.

Fabricator is a tool for building website UI toolkits - _think ["Tiny Bootstraps, for Every Client"](http://daverupert.com/2013/04/responsive-deliverables/#tiny-bootstraps-for-every-client)_

## Quick Start

```shell
curl -L https://github.com/fbrctr/fabricator/archive/master.tar.gz | tar zx --strip 1

npm start
```

**Use the below command to build style guide.**
```shell
gulp --dev
```

This command is programmed for Fabricator to take all the files and generate the style guide UI. It will create a `localhost` instance of the style guide and automatically open a new tab in your web browser. **You will need to append the word `styleguide` to the URL in order to view the style guide UI** (eg. `http://localhost:3002/styleguide`)

---
## Documentation

#### [Read the docs →](http://fbrctr.github.io/docs)
---
## Demo

#### [Default Fabricator Instance→](http://fbrctr.github.io/demo)
---
## Credits

Created by [Luke Askew](http://twitter.com/lukeaskew).

Logo by [Abby Putinski](https://abbyputinski.com/)
---
## License

[The MIT License (MIT)](http://opensource.org/licenses/mit-license.php)
