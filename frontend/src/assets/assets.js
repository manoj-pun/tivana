import compass from "./compass.png";
import compassFilled from "./compassFilled.png";
import heart from "./heart.png";
import heartFilled from "./heartFilled.png";
import home from "./home.png";
import homeFilled from "./homeFilled.png";
import menu from "./menu.png";
import menuFilled from "./menuFilled.png";
import chat from "./chat.png";
import chatFilled from "./chatFilled.png";
import grid from "./grid.png";
import gridFilled from "./gridFilled.png";
import logo from "./logo.png";
import more from "./more.png";
import save from "./save.png";
import saveFilled from "./saveFilled.png";
import search from "./search.png";
import searchFilled from "./searchFilled.png";
import send from "./send.png";
import cross_icon from "./cross_icon.png";
import downArrow from "./down-arrow.png";
import upArrow from "./arrow-up.png";
import rightArrow from "./chevron.png";
import leftArrow from "./left-chevron.png";
import comment from "./comment.png";
import uploadArea from "./upload_area.png"
import loginCover from "./loginCover.png"
import defaultprofile from "./defaultprofile.jpeg"

import profile from "./profile.jpeg"
import check from "./check.jpeg"

import profile1 from "./profile1.jpeg"
import profile2 from "./profile2.jpeg"
import profile3 from "./profile3.jpeg"
import profile4 from "./profile4.jpeg"
import profile5 from "./profile5.jpeg"
import profile6 from "./profile6.jpeg"

import ebc from "./ebc.jpg"
import mustang from "./mustang.jpg"
import kori from "./kori.jpg"

import abc from "./abc.jpg"
import fast9 from "./fast9.jpg"
import kimbap from "./kimbap.jpg"
import tilicho from "./tilicho.jpg"
import pokhara from "./pokhara.jpg"

import damauli from "./damauli.jpg"
import lekhnath from "./lekhnath.jpg"
import naubise from "./naubise.jpeg"
import mugling from "./mugling.jpg"
import kimbap1 from "./kimbap1.jpg"
import kimbap2 from "./kimbap2.jpg"
import kimbap3 from "./kimbap3.jpg"
import kimbap4 from "./kimbap4.png"
import f1 from "./f1.jpg"
import f2 from "./f2.jpg"
import f3 from "./f3.jpg"
import f4 from "./f4.jpg"
import f5 from "./f5.jpg"
import f6 from "./f6.jpg"

export const assets = {
    compass,
    compassFilled,
    heart,
    heartFilled,
    home,
    homeFilled,
    menu,
    menuFilled,
    chat,
    chatFilled,
    grid,
    gridFilled,
    logo,
    more,
    save,
    saveFilled,
    search,
    searchFilled,
    send,
    cross_icon,
    upArrow,
    downArrow,
    leftArrow,
    rightArrow,
    comment,
    abc,
    profile,
    pokhara,
    uploadArea,
    loginCover,
    defaultprofile
};

export const searchData = [
    {_id:1, profileImage:profile1, username:"jonhdoe", fullName:"John Doe"},
    {_id:2, profileImage:profile3, username:"emmabrown", fullName:"Emma Brown"},
    {_id:3, profileImage:profile2, username:"janedoe", fullName:"Jane Doe"},
    {_id:4, profileImage:profile4, username:"dylanbrooks", fullName:"Dylan Brooks"},
    {_id:5, profileImage:profile5, username:"gracetaylor", fullName:"GraceTaylor"},
    {_id:6, profileImage:profile6, username:"lukeharisson", fullName:"Luke Harrisson"}
]

export const notificationsData = [
    {_id:1, profileImage:profile1, username:"johndoe", userAction:"liked your post.", likedPost:kori, timestamp:"20 min ago"},
    {_id:2, profileImage:profile3, username:"emmabrown", userAction:"started following you.", timestamp:"5 min ago"},
    {_id:3, profileImage:profile2, username:"janedoe", userAction:"commented on your post.", commentedPost:ebc, timestamp:"10 min ago"},
    {_id:4, profileImage:profile4, username:"dylanbrooks", userAction:"liked your post.", likedPost:mustang, timestamp:"2 min ago"},
    {_id:5, profileImage:profile5, username:"gracetaylor", userAction:"followed you back.", timestamp:"5 min ago"},
    {_id:6, profileImage:profile6, username:"lukeharisson", userAction:"started following you", timestamp:"10 min ago"},
]

export const homeData = [
    {
        _id:1, 
        name:"John Doe",
        username:"johndoe", 
        profileImage:profile1, 
        timestamp:"2 min ago", 
        thumbnail: abc, 
        info:"Annapurna Base Camp Trek, probably the best legendary and classical treks in the world, offers breath-taking mountain views and gives the opportunity to experience the typical Nepali village, local people, and their way of living traditional life in the Himalayas of Nepal",
        dropdowns:[
            {
                title:"Day1", subTitle:"Arrive in Pokhara", dropdownImages:[damauli,mugling,lekhnath,naubise], description:"Pokhara is a city on Phewa Lake, in central Nepal. It’s known as a gateway to the Annapurna Circuit, a popular trail in the Himalayas. Tal Barahi Temple, a 2-story pagoda, sits on an island in the lake."
            },
            {
                title:"Day2", subTitle:"Arrive in Pokhara", dropdownImages:[damauli,mugling,lekhnath,naubise], description:"Pokhara is a city on Phewa Lake, in central Nepal. It’s known as a gateway to the Annapurna Circuit, a popular trail in the Himalayas. Tal Barahi Temple, a 2-story pagoda, sits on an island in the lake."
            },
            {
                title:"Day3", subTitle:"Arrive in Pokhara", dropdownImages:[damauli,mugling,lekhnath,naubise], description:"Pokhara is a city on Phewa Lake, in central Nepal. It’s known as a gateway to the Annapurna Circuit, a popular trail in the Himalayas. Tal Barahi Temple, a 2-story pagoda, sits on an island in the lake."
            },
            {
                title:"Day4", subTitle:"Arrive in Pokhara", dropdownImages:[damauli,mugling,lekhnath,naubise], description:"Pokhara is a city on Phewa Lake, in central Nepal. It’s known as a gateway to the Annapurna Circuit, a popular trail in the Himalayas. Tal Barahi Temple, a 2-story pagoda, sits on an island in the lake."
            },
            {
                title:"Day5", subTitle:"Arrive in Pokhara", dropdownImages:[damauli,mugling,lekhnath,naubise], description:"Pokhara is a city on Phewa Lake, in central Nepal. It’s known as a gateway to the Annapurna Circuit, a popular trail in the Himalayas. Tal Barahi Temple, a 2-story pagoda, sits on an island in the lake."
            },
            {
                title:"Day6", subTitle:"Arrive in Pokhara", dropdownImages:[damauli,mugling,lekhnath,naubise], description:"Pokhara is a city on Phewa Lake, in central Nepal. It’s known as a gateway to the Annapurna Circuit, a popular trail in the Himalayas. Tal Barahi Temple, a 2-story pagoda, sits on an island in the lake."
            },
            {
                title:"Day7", subTitle:"Arrive in Pokhara", dropdownImages:[damauli,mugling,lekhnath,naubise], description:"Pokhara is a city on Phewa Lake, in central Nepal. It’s known as a gateway to the Annapurna Circuit, a popular trail in the Himalayas. Tal Barahi Temple, a 2-story pagoda, sits on an island in the lake."
            },
        ],
        profileSection:{
            postsCount:0,
            followersCount:12,
            followingCount:13,
            bio:"Striving for progress, not perfection. Every day is a new opportunity to grow.",
            followers:[
                {followersImage:profile1,followersName:"Emma Brown", followersUsername:"emmabrown"},
                {followersImage:profile2,followersName:"Jane Doe", followersUsername:"janedoe"},
                {followersImage:profile3,followersName:"Dylan Brooks", followersUsername:"dylanbrooks"},
                {followersImage:profile4,followersName:"Grace Taylor", followersUsername:"gracetaylor"},
                {followersImage:profile5,followersName:"Luke Harisson", followersUsername:"lukeharisson"},
            ],
            following:[
                {followingImage:profile1,followingName:"Emma Brown", followingUsername:"emmabrown"},
                {followingImage:profile2,followingName:"Jane Doe", followingUsername:"janedoe"},
                {followingImage:profile3,followingName:"Dylan Brooks", followingUsername:"dylanbrooks"},
                {followingImage:profile4,followingName:"Grace Taylor", followingUsername:"gracetaylor"},
                {followingImage:profile5,followingName:"Luke Harisson", followingUsername:"lukeharisson"},
            ]
        },
        userPosts: [damauli,mugling,lekhnath,naubise],
        savedPosts: [f1,f2,f3,f4],
    },

    {
        _id:2, 
        name:"Jane Doe",
        username:"janedoe", 
        profileImage:profile2, 
        timestamp:"10 min ago", 
        thumbnail: fast9, 
        info:"Dom and the crew must take on an international terrorist who turns out to be Dom and Mia's estranged brother.",
        dropdowns:[
            {
                title:"Fast 9: Part 1",dropdownImages:[f1,f2,f3], description:"Fast9"
            },
            {
                title:"Fast 10: Part 2",dropdownImages:[f4,f5,f6], description:"Fast9"
            }
        ],
        profileSection:{
            postsCount:6,
            followersCount:312,
            followingCount:113,
            bio:"Believe in yourself, even when no one else does. Keep pushing forward, success is near.",
            followers:[
                {followersImage:profile1,followersName:"Emma Brown", followersUsername:"emmabrown"},
                {followersImage:profile2,followersName:"Jane Doe", followersUsername:"janedoe"},
                {followersImage:profile3,followersName:"Dylan Brooks", followersUsername:"dylanbrooks"},
                {followersImage:profile4,followersName:"Grace Taylor", followersUsername:"gracetaylor"},
                {followersImage:profile5,followersName:"Luke Harisson", followersUsername:"lukeharisson"},
                {followersImage:profile1,followersName:"Emma Brown", followersUsername:"emmabrown"},
                {followersImage:profile2,followersName:"Jane Doe", followersUsername:"janedoe"},
                {followersImage:profile3,followersName:"Dylan Brooks", followersUsername:"dylanbrooks"},
                {followersImage:profile4,followersName:"Grace Taylor", followersUsername:"gracetaylor"},
                {followersImage:profile5,followersName:"Luke Harisson", followersUsername:"lukeharisson"},
            ],
            following:[
                {followingImage:profile1,followingName:"Emma Brown", followingUsername:"emmabrown"},
                {followingImage:profile2,followingName:"Jane Doe", followingUsername:"janedoe"},
                {followingImage:profile3,followingName:"Dylan Brooks", followingUsername:"dylanbrooks"},
                {followingImage:profile4,followingName:"Grace Taylor", followingUsername:"gracetaylor"},
                {followingImage:profile5,followingName:"Luke Harisson", followingUsername:"lukeharisson"},
                {followingImage:profile1,followingName:"Emma Brown", followingUsername:"emmabrown"},
                {followingImage:profile2,followingName:"Jane Doe", followingUsername:"janedoe"},
                {followingImage:profile3,followingName:"Dylan Brooks", followingUsername:"dylanbrooks"},
                {followingImage:profile4,followingName:"Grace Taylor", followingUsername:"gracetaylor"},
                {followingImage:profile5,followingName:"Luke Harisson", followingUsername:"lukeharisson"},
            ]},
        userPosts: [f1,f2,f3,f4],
        savedPosts: [damauli,mugling,lekhnath,naubise],
    },

    {
        _id:3, 
        name:"Emma Brown",
        username:"emmabrown", 
        profileImage:profile3, 
        timestamp:"12 min ago", 
        thumbnail:kimbap, 
        info:"Kimbap, also known as gimbap, is a Korean dish consisting of cooked rice and various fillings rolled in dried seaweed sheets (gim) and served in bite-sized slices. ",
        dropdowns:[
            {
                title:"Kimbap Recipe Part 1",dropdownImages:[kimbap1,kimbap2,kimbap3,kimbap4], description:"Kimbap"
            },
            {
                title:"Kimbap Recipe Part 1",dropdownImages:[kimbap1,kimbap2,kimbap3,kimbap4], description:"Kimbap"
            }
        ],
        profileSection:{
            postsCount:0,
            followersCount:121,
            followingCount:131,
            bio:"",
            followers:[
                {followersImage:profile1,followersName:"Emma Brown", followersUsername:"emmabrown"},
                {followersImage:profile2,followersName:"Jane Doe", followersUsername:"janedoe"},
                {followersImage:profile3,followersName:"Dylan Brooks", followersUsername:"dylanbrooks"},
                {followersImage:profile4,followersName:"Grace Taylor", followersUsername:"gracetaylor"},
                {followersImage:profile5,followersName:"Luke Harisson", followersUsername:"lukeharisson"},
            ],
            following:[
                {followingImage:profile1,followingName:"Emma Brown", followingUsername:"emmabrown"},
                {followingImage:profile2,followingName:"Jane Doe", followingUsername:"janedoe"},
                {followingImage:profile3,followingName:"Dylan Brooks", followingUsername:"dylanbrooks"},
                {followingImage:profile4,followingName:"Grace Taylor", followingUsername:"gracetaylor"},
                {followingImage:profile5,followingName:"Luke Harisson", followingUsername:"lukeharisson"},
            ]},
        userPosts: [kimbap,kimbap1,kimbap2,kimbap3,kimbap4],
        savedPosts: [kimbap,kimbap1,kimbap2,kimbap3,kimbap4],
    },

    {
        _id:4, 
        name:"Dylan Brooks",
        username:"dylanbrooks", 
        profileImage:profile4, 
        timestamp:"22 min ago", 
        thumbnail:tilicho, 
        info:"Tilicho Lake is a glacial lake located in the Manang district of Nepal, 55 kilometres (34 mi) as the crow flies from the city of Pokhara.",
        profileSection:{
            postsCount:0,
            followersCount:180,
            followingCount:130,
            bio:"",
            followers:[
                {followersImage:profile1,followersName:"Emma Brown", followersUsername:"emmabrown"},
                {followersImage:profile2,followersName:"Jane Doe", followersUsername:"janedoe"},
                {followersImage:profile3,followersName:"Dylan Brooks", followersUsername:"dylanbrooks"},
                {followersImage:profile4,followersName:"Grace Taylor", followersUsername:"gracetaylor"},
                {followersImage:profile5,followersName:"Luke Harisson", followersUsername:"lukeharisson"},
            ],
            following:[
                {followingImage:profile1,followingName:"Emma Brown", followingUsername:"emmabrown"},
                {followingImage:profile2,followingName:"Jane Doe", followingUsername:"janedoe"},
                {followingImage:profile3,followingName:"Dylan Brooks", followingUsername:"dylanbrooks"},
                {followingImage:profile4,followingName:"Grace Taylor", followingUsername:"gracetaylor"},
                {followingImage:profile5,followingName:"Luke Harisson", followingUsername:"lukeharisson"},
            ]}
    },

    {
        _id:5, 
        // name:"Grace Taylor",
        username:"gracetaylor", 
        profileImage:profile5, 
        timestamp:"22 min ago", 
        thumbnail:pokhara, info:"Pokhara is a city on Phewa Lake, in central Nepal. It’s known as a gateway to the Annapurna Circuit, a popular trail in the Himalayas. Tal Barahi Temple, a 2-story pagoda, sits on an island in the lake.",
        profileSection:{
            postsCount:0,
            followersCount:612,
            followingCount:413,
            bio:"The journey may be tough, but I’m tougher. Keep moving forward, greatness is within reach.",
            followers:[
                {followersImage:profile1,followersName:"Emma Brown", followersUsername:"emmabrown"},
                {followersImage:profile2,followersName:"Jane Doe", followersUsername:"janedoe"},
                {followersImage:profile3,followersName:"Dylan Brooks", followersUsername:"dylanbrooks"},
                {followersImage:profile4,followersName:"Grace Taylor", followersUsername:"gracetaylor"},
                {followersImage:profile5,followersName:"Luke Harisson", followersUsername:"lukeharisson"},
            ],
            following:[
                {followingImage:profile1,followingName:"Emma Brown", followingUsername:"emmabrown"},
                {followingImage:profile2,followingName:"Jane Doe", followingUsername:"janedoe"},
                {followingImage:profile3,followingName:"Dylan Brooks", followingUsername:"dylanbrooks"},
                {followingImage:profile4,followingName:"Grace Taylor", followingUsername:"gracetaylor"},
                {followingImage:profile5,followingName:"Luke Harisson", followingUsername:"lukeharisson"},
            ]}
    },
]

export const fakeComments = {
    userProfile: {
      id: 1,
      username: "emmabrown",
      user: profile1,
      text: "Wow, this trek looks incredible! Definitely adding it to my bucket list!",
      timestamp: "2 min ago",
    },
    Comments: [
      {
        id: 1,
        username: "janesmith",
        user: profile2,
        text: "Wow, this trek looks incredible! Definitely adding it to my bucket list!",
        timestamp: "2 min ago",
      },
      {
        id: 2,
        username: "dylanbrooks",
        user: profile3,
        text: "Amazing shots, Mustang is such a hidden gem!",
        timestamp: "5 min ago",
      },
      {
        id: 3,
        username: "gracetaylor",
        user: profile4,
        text: "Loved the vibe of this trip. Pokhara is one of my favorite places!",
        timestamp: "10 min ago",
      },
      {
        id: 4,
        username: "lukeharisson",
        user: profile5,
        text: "I can't wait to see the stunning landscapes of Mustang!",
        timestamp: "15 min ago",
      },
      {
        id: 5,
        username: "emmabrown",
        user: profile1,
        text: "Wow, this trek looks incredible! Definitely adding it to my bucket list!",
        timestamp: "2 min ago",
      },
      {
        id: 6,
        username: "janesmith",
        user: profile2,
        text: "Wow, this trek looks incredible! Definitely adding it to my bucket list!",
        timestamp: "2 min ago",
      },
      {
        id: 7,
        username: "dylanbrooks",
        user: profile3,
        text: "Amazing shots, Mustang is such a hidden gem!",
        timestamp: "5 min ago",
      },
    ],
};
