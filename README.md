# Adding `ras-styleguide` repository as `prime` dependency

**NOTES:**

- All commit/pull commands need to be runned from the repo root level.
- Gulp tasks to compile scripts/styles are runned at `Rasmussen/Assets/dev/prime` level.
- Gulp tasks to copy staging-ready scripts/styles to `dist` folder is runned at `Rasmussen/Assets/dev` level.

## 1. Clone RasmussenCollegeSCEDU repo

```
git clone git@cegitrepo-ob-1p.deltakedu.corp:collegiseducation/RasmussenCollegeSCEDU.git
```

## 2. Update RasmussenCollegeSCEDU repo

```
git pull origin master
```
## 3. Add style guide subtree
Even if there is a `prime` folder in the repo, all developers still need a *local copy* of `ras-styleguide` subtree
```
git remote add ras-styleguide git@cegitrepo-ob-1p.deltakedu.corp:collegiseducation/ras-styleguide.git
```

## 4. Add prime folder

Creates `prime` subfolder within `Rasmussen/Assets/dev` folder

```
git subtree add --prefix=Rasmussen/Assets/dev/prime/ ras-styleguide feature/refactor
```

## 5. Ensure subtree is added properly

Ensure there are 2 instances of SiteCore repo and 2 instances of styleguide (1 fetch, 1 push for each), 4 instances total

```
git remote -v
```

For example:

`origin	git@cegitrepo-ob-1p.deltakedu.corp:collegiseducation/RasmussenCollegeSCEDU.git (fetch)`

`origin	git@cegitrepo-ob-1p.deltakedu.corp:collegiseducation/RasmussenCollegeSCEDU.git (push)`

`ras-styleguide	git@cegitrepo-ob-1p.deltakedu.corp:collegiseducation/ras-styleguide.git (fetch)`

`ras-styleguide	git@cegitrepo-ob-1p.deltakedu.corp:collegiseducation/ras-styleguide.git (push)`

## 6.  Update ras-styleguide subtree

```
git subtree pull --prefix=Rasmussen/Assets/dev/prime/ ras-styleguide feature/refactor
```

## 7. Install dependencies

Frontend developer: run this command in `Rasmussen/Assets/dev/` and `Rasmussen/Assets/dev/prime` directories

Backend developers: run this command only in `Rasmussen/Assets/dev/prime` directory

```
bower install && npm install
```

## 8. Run styles/scripts tasks

In `Rasmussen/Assets/dev/prime` directory:

- run this task to compile files and watch changes:

```
gulp --dev
```

- run this task for styles only:

```
gulp styles:project
```

- run this task for scripts only:

```
gulp scripts:project
```

Make changes and commit.


## 9. Committing changes

#### If changes only affect project repo (SiteCore site):

- Commit and push as usual

```
git push
```

#### If changes affect only ras-styleguide subtree:

- Commit as usual, with commit notes with prefix “prime:”
- Push to subtree

```
git subtree push --prefix=Rasmussen/Assets/dev/prime/ ras-styleguide feature/refactor
```

#### If changes affect both project and subtree:

- Commit as usual, with commit notes with prefix “edu/prime:”
- Push to project repo

```
git push
```

- Push to subtree

```
git subtree push --prefix=Rasmussen/Assets/dev/prime/ ras-styleguide feature/refactor
```

## 10. Copy staging-ready files to `dist` folder

- In `Rasmussen/Assets/dev/` directory, run task command:

```
gulp dist
```

- Commit changes, prefix with "edu:"

- Push to project repo

```
gulp push
```# College
# College
