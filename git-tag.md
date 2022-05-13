# [git tag使用方法](https://www.cnblogs.com/liuhanxu/p/15576372.html)

## git tag 作用

tag是一个记录点，用于记录某个commit点或分支的历史快照，这样方便查找版本号，相比commit id 更加人性化，直接可以通过v1或v2查找对应发布版本的源码。

## 创建 tag

```undefined
git tag <Tag名字>
```

## 创建带注释的 tag

```css
git tag -a <Tag名字> -m <注释文字>
```

## 查看 tag 列表

```undefined
git tag
```

## 查看 tag 详细信息

```xml
git show <Tag 名字>
```

## 删除 tag

```xml
git tag -d <Tag 名字>
```

## 推送Tag到远程

```armasm
git push origin <Tag 名字> // 推送单个Tag
git push origin --tags  // 推送所有本地Tag
```

## 删除远程Tag

1. 当本地Tag已经Push到远程代码仓库后，再要删除这个Tag,就必须删除本地Tag.

```xml
git tag -d <Tag 名字>
```

1. 删除本地Tag后，再重新Push到远程的代码仓库。

```ruby
git push origin :refs/tags/<Tag 名字>
```