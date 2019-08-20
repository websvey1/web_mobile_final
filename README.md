# 프로젝트 관리 블로그

> 팀원 : 김예지, 김준호, 남궁명, 송영신, 이호중



## 1. 목표

* 개인 프로젝트 / 팀 프로젝트를 관리할 수 있는 웹사이트 구축
* 프로젝트 관리란? 
  * 명세서 작성/수정/삭제 + 해당 프로젝트의 POST 작성/수정/삭제 + Calendar(일정관리) + To Do List



## 2. 사용 기술

* Node.js express + Mysql + Vue.js + Vuetify

   

## 3. 데이터 베이스 설계

![](image\database.PNG)



## 4. 기능

1. **User**
   
    * **회원 가입**
    
      ![](/uploads/d63b32c920678ba446a2cf99857bb777/회원가입.PNG)
    
      * profile 사진과 관심 기술(최대 3개)을 등록할 수 있다.
      * ID 중복검사를 SIGN UP 클릭시 자동으로 할 수 있다.
    
    
    
    * **회원 정보 수정**
    
      ![](image\회원정보수정.PNG)
    
      
    
    * **회원 탈퇴**
    
      ![](.\image\회원탈퇴.PNG)

2. **Header**

    * **Login**

      ![](.\image\login.png)

      * Login을 한 후에 자신의 id와 함께 새로운 message 알림이 나타난다.
      * Login을 하지 않는다면 header에 있는 project, post 기능을 제외한 나머지 기능들을 실행할 수 없다.

    

    * **Project**
    
      ![](.\image\header_project.PNG)
    
      * 로그인이 안 되어있는 상태에서도 볼 수 있는 project
      * 비공개 project를 제외한 모든 project를 볼 수 있다.
      * Personal Project, Team Project를 선택하여 볼 수 있다.
      * 검색 기능 - 제목, 내용으로 프로젝트를 검색할 수 있다.
    
    
    
    * **Post**
    
      ![](.\image\header_post.PNG)
    
      ![](.\image\header_post2.PNG)
    
      * 로그인이 안 되어있는 상태에서도 볼 수 있는 post
      * 해당 project가 비공개 상태라면 post가 공개 상태여도 비공개로 나타난다.
      * Personal Post, Team Post를 선택하여 볼 수 있다.
      * 검색 기능 - 제목, 내용, 제목+내용, 작성자로 post를 검색할 수 있다.
    



3. **개인 Project (Project 명세서 관리, Post, To Do List, Calendar)**

   * **Project**

     ![](.\image\project.PNG)

     * MENU에 있는 Personal - Project를 클릭하면 로그인 한 User가 쓴 project만 나타난다.
     
     
     
     ![](.\image\project_create.PNG)
     
     * 새로운 프로젝트 생성 (프로젝트 명세서 작성)
     * 프로젝트의 시작일과 마감일을 선택하여 일정을 관리 할 수 있으며, 프로젝트의 상태(계획, 진행중, 완료)를 선택할 수 있다.
     * 최대 5개의 사진을 첨부 할 수 있다.
       * 사진을 넣고 싶지 않다면 RANDOM IMAGE를 선택할 수 있다.
       * 첨부한 사진을 넣고 싶지 않다면 REMOVE를 클릭해 제거할 수 있다.
     * 공개 / 비공개 설정을 할 수 있다.
     
     
     
     ![](.\image\myproject.PNG)
     
     * User가 자신이 쓴 project를 클릭하면 project의 명세서 확인, To do list와 해당 project에 대한 post를 작성 할 수 있다.
     * User는 project를 추가, 확인, 수정, 삭제할 수 있다.
     * User는 해당 Project의 Post들을 확인할 수 있다.
     * +를 클릭하면 생성일, 수정일, git_url 등 더 상세한 정보를 확인할 수 있다.
     
   
   
   
   * **Post**

     ![](.\image\post.PNG)

     * Project - Post보기를 클릭하면 User가 작성한 Project에 대한 Post들을 볼 수 있다.
     * Header에서 보이지 않던 비밀 Post를 작성자는 확인 할 수 있다.
     * Post를 추가, 확인, 수정, 삭제할 수 있다.
     
     ![](.\image\post_create.PNG)
     
     * Post를 작성할 때, 해당 Project 이름이 자동으로 설정된다.
     * Random Image 또는 자신이 선택한 Image를 첨부할 수 있다.
     * 여러가지 Tag를 작성할 수 있으며, 공개 / 비공개 설정을 할 수 있다.
   
   
   
   * **To Do List**
   
     ![](.\image\todolist.PNG)
   
     * Drag and Drop을 사용하여 To do list를 구현하였다.
     * 해야할 일 / 하고 있는 일/ 완성한 일을 관리할 수 있다.
     * To do list 목록을 추가하거나 삭제 할 수 있다.
   
   
   
   * **Calendar**
   
     ![](.\image\calendar.PNG)
   
     * User는 Calendar를 사용하여 자신의 일정관리를 할 수 있다.
     * 일정의 Title, Start date, Eed date, Event description을 작성할 수 있으며 자신이 원하는 color(THEME)를 선택할 수 있다.확인하고 싶은 일정을 누르면 모달로 일정의 정보를 확인, 수정, 삭제 할 수 있다



4. **Team Project (Team 관리, Project 명세서 관리, Post, To Do List, Calendar)**

   * **Team 추가 / 확인**

     ![](.\image\Team추가.PNG)

     * Team Project를 위해 Team을 추가한다.
     * Team Name을 정할 수 있고, 회원가입된 모든 User에서 팀원을 선택할 수 있다.
       * 팀원의 이름 또는 id를 작성하면 해당 User가 나와 쉽게 선택할 수 있다.
     * 이미 선택한 User는 다른 색으로 나타나 중복 선택을 방지할 수 있다.

     

     

     ![](.\image\Team확인.PNG)

     ![](.\image\Team_member.png)

     *  선택을 누르면 자신이 속한 Team을 모두 볼 수 있으며, 새로운 Team 초대가 왔을 시 MENU Navigation bar에 New라는 알림이 뜬다.
     * 팀 초대를 수락하거나 거절할 수 있으며 수락 시에는 Team project를 관리할 수 있으며, 팀원을 추가할 수 있다.
     * Team member를 추가 할 수 있으며, 팀원을 확인할 수 있다.

   

   * **Team Project**

     ![](.\image\teampjt.PNG)

     * 원하는 Team을 선택하면 해당 Team의 project들을 확인 할 수 있다.

     

     ![](.\image\teampjt추가.PNG)

     * 새로운 Team Project를 추가할 수 있다.
     * 개인 Project와 다르게 Team Project는 팀장을 선택할 수 있다.

     

     ![](.\image\teamproject.PNG)

     * Team project를 클릭하면 project의 명세서 확인, To do list와 해당 project에 대한 post를 작성 할 수 있다.
     * Team project는 팀원 모두 수정이 가능하며 삭제는 팀장만 권한을 가진다.
     * +를 클릭하면 Tech(주요 기술), 생성일, 수정일, git_url 등 더 상세한 정보를 확인할 수 있다.

   

   * **Team Post**

     ![](.\image\teampost추가.PNG)

     ![](.\image\teampost.PNG)

     * Team Post는 팀원끼리 공유 할 수 있다.
     * Post를 작성할 때, 해당 Team Project 이름이 자동으로 설정된다.
     * Team Post들을 모아 볼 수 있다.

   

   * **Team To Do List**

     ![](.\image\team_todolist.PNG)

     * To Do List은 팀원 모두 작성, 삭제를 할 수 있다.
     * 팀원 모두 해야할 일 / 하고 있는 일/ 완성한 일을 함께 관리할 수 있다.

   

   * **Team Calendar**

     ![](.\image\teamcalendar.png)

     * Team을 선택하면 해당 Team의 일정을 보여준다.
     * 해당 Team에 속해 있는 팀원들과 일정을 모두 공유할 수 있다.
     * 일정 추가, 수정, 삭제를 할 수 있다.



5. **AnotherUser**

   * AnotherUser

     ![](.\image\anotheruser.PNG)

     * AnotherUser page에 접속하면 해당 사이트에 회원가입된 모든 User들을 확인할 수 있다.
     * ID, Email, 관심 기술로 User들을 검색할 수 있다.

     ![](.\image\anotheruserdetail.PNG)

     * 알고 싶은 User를 선택하면 해당 User의 Profile Image, ID, Email, 관심기술을 확인 할 수 있다.
     * 해당 User의 개인 Project/Post, Team Project/Post를 확인 할 수 있다.
   
   
   
   * **User Follow**
   
     ![](.\image\userfollow.png)
   
     * 만약 관심 있는 User라면 profile image 옆 icon을 클릭하여 follow할 수 있다.
     * 해당 User의 follower, following을 확인 할 수 있다.
   
   
   
   * **Message**
   
     ![](.\image\message.PNG)
   
     * message를 누르면 해당 user에게 메세지를 보낼 수 있다.