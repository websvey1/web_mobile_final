# 프로젝트 관리 블로그

> 팀원 : 김예지, 김준호, 남궁명, 송영신, 이호중



## 1. 목표

* 개인 프로젝트 / 팀 프로젝트를 관리할 수 있는 웹사이트 구축
* 프로젝트 관리란? 
  * 명세서 관리 + 해당 프로젝트의 POST + 일정 관리 + To Do List



## 2. 사용 기술

* Node.js + Vue.js + Mysql

   

## 3. 데이터 베이스 설계

![](C:\Users\multicampus\Pictures\database.PNG)

* User
* Project
* 



## 4. 기능

1. **User**
    * 회원 가입
    
      ![](C:\Users\multicampus\Pictures\회원가입.PNG)
    
    * 회원 정보 수정
    
      ![](C:\Users\multicampus\Pictures\회원정보수정.PNG)
    
    * 회원 탈퇴
    
      ![](C:\Users\multicampus\Pictures\회원탈퇴.PNG)



2. **Header**

    * **Login**

      ![](C:\Users\multicampus\Pictures\login.png)

      * Login을 한 후에 자신의 id와 함께 새로운 message 알림이 나타난다.
      * Login을 하지 않는다면 header에 있는 project, post 기능을 제외한 나머지 기능들을 실행할 수 없다.

    * **Project**

      ![](C:\Users\multicampus\Pictures\header_project.PNG)

      * 로그인이 안 되어있는 상태에서도 볼 수 있는 project
      * 비공개 project를 제외한 모든 project를 볼 수 있다.
      * Personal Project, Team Project를 선택하여 볼 수 있다.
      * 검색 기능 - 제목, 내용으로 프로젝트를 검색할 수 있다.

    * **Post**

      ![](C:\Users\multicampus\Pictures\header_post.PNG)

      * 로그인이 안 되어있는 상태에서도 볼 수 있는 post
      * 해당 project가 비공개 상태라면 post가 공개 상태여도 비공개로 나타난다.
      * Personal Post, Team Post를 선택하여 볼 수 있다.
      * 검색 기능 - 제목, 내용, 제목+내용, 작성자로 post를 검색할 수 있다.



3. 개인 프로젝트

   * Personal - Project

     ![](C:\Users\multicampus\Pictures\project.PNG)

     

4. 팀 프로젝트 

3. AnotherUser