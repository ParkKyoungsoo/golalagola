# pjt1_sub2 README



## 팀 소개

팀명: 키오스크는 멈추지 않아 boy

팀원: 구준모, 김용욱, 김재경(팀장), 박경수, 변찬석, 안성호





## 프로젝트 소개



### 프로젝트명

Gola la Gola



### 주제

마트 재고관리 및 구매유도 플랫폼

판매자는 재고관리 및 기회비용 절감 & 소비자는 싼 가격에 질좋은 상품 구매 가능



### 기획의도 및 문제의식

- #### 소비자

  - 큰 소비를 꺼려하게 되면서 가격 만족도가 높은 상품을 찾고있다.
  - 저렴한 물품들의 정보를 얻고, 이를 구매하고 싶어도 대량으로 주문하여 배송 가능한 온라인 쇼핑몰 밖에 없다. 주거지 주변 상권에서 해당 정보를 찾기 어렵다. 

- #### 판매자

  - 코로나 여파로 오프라인 소비가 줄어들었다. 때문에 지역 상권이 위축되어 재고관리비용이 증가해 소상공인들의 어려움이 크다.
  - 온라인 쇼핑몰을 갖지 못한 소상공인은 판매를 오직 오프라인으로만 진행해야 하며, 남는 재고상품에 대한 정보를 제공할 커넥션이 부족하다.

- #### 기획의도

  - 마트에서 나오는 재고 상품을 소비자들에게 싼 가격에 제공할 수 있도록 웹, Kiosk 를 이용한 서비스로 소비자에게 만족도 높은 소비를 촉진시키고자 한다.



### 주요대상 및 타겟

지역 상권의 점주들과 해당 상권을 이용하고자 하는 소비자들 (주부, 20, 30 대 대학생 및 사회 초년생)



### 페르소나

- 굳이 따지면 질보다 가격이 더 중요하다 (적당 수준 이상의 질 보장)

  대학생, 20& 30대 사회 초년생

- 요리 하는 것을 좋아한다 

  20& 30 대 사회 초년생

- 마트를 잘 이용한다

  주부, 20 & 30대 사회 초년생



## 기술구조



## ERD 구성

![Gola la Gola ERD](asset/Gola la Gola ERD.png)





## 개발 규칙

#### branch 규칙

```
master -> develop -> feature/기능이름

Add 파일명 | 지라 이슈키
Update 파일명 | 지라 이슈키
Delete 파일명 | 지라 이슈키
```



#### README

```
Daily Task 정리
```



#### git flow 사용하여 작업하기

```bash
# 자신의 작업용 branch 만들기
$ git flow feature start 작업하는 내용

# 다른사람과 같이 작업하고 싶다면 브랜치 publish 하기
$ git flow feature publish 작업하는 내용

# 공동 작업자는 publish된 branch로 이동하기
$ git flow feature origin 작업하는 내용

# branch 이동할 때
$ git checkout 브랜치_이름

# branch의 작업을 끝내고 브랜치 삭제하기
# 공동 작업인 경우는 마지막 작업자가 수행
$ git flow feature finish 작업하는_내용(작업자_이름)

$ git add .
$ git commit -m "커밋 메세지"
$ git push

예시)
$ git flow feature start CreateKiosk
$ git commit -m "Create Kiosk | Jira Serial Number"
```



#### Merge

- gitlab의 **Merge Request** 탭에 들어가서 맨 위에 `Create Merge Request` 버튼이 생겼는지 확인합니다.
- 제목과 설명을 작성하고 **Merge Request**를 요청합니다.
- 모두가 Merge Request에 **코드리뷰**를 진행합니다. 
- Merge 는 Maintainer 가 할 수 있습니다. (김재경, 안성호)
