# sequelize model 생성 및 migration 방법





### 모델생성, 마이그레이션 파일 생성

```bash
$ sequelize model:generate --name User --attributes name:string,email:string,age:integer
```



### DB에 migration

```bash
# migration
$ sequelize db:migrate

# 수정사항이 생길 때, migration 취소
$ sequelize db:migrate:undo:all
```



### seeder 테이블에 정적데이터 추가하기

```bash
# seed 파일을 만들 때
$ sequelize seed:generate --name userData

# 데이터를 넣을 때
$ sequelize db:seed:all

# 취소할 때
$ sequelize db:seed:undo:all
```