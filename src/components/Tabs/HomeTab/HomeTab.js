import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import PlayIcon from "../../../../assets/images/icons/play.png";
import { screenDimensions } from "../../../utils/global";

function HomeTab({ navigation }) {
  const [trendingPeople, setTrendingPeople] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);

  const fetchVideos = () => {
    setTrendingPeople([{"id": "2276", "is_saved": 0, "link": "/tv?vid=GQoOyLL307071", "note_id": "34119", "profile": {"id": "1682", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_Dhruv8iTZiZyZsZkCABTM7DwpyVm01j4N3x0bQTb1501259319.png", "username": "Dhruv"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_34119_DhruvCThaYaSno9uJsqbVgD80PXnIAc0mFI1555266140.mp4", "star": {"action": "star", "count": 2, "is_starred": 0}, "tag": "Dance", "tag_id": "1042", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_34119_DhruvCThaYaSno9uJsqbVgD80PXnIAc0mFI1555266140.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Dhruv", "views": "37"}, {"id": "2110", "is_saved": 0, "link": "/tv?vid=eLrweBC304524", "note_id": "33836", "profile": {"id": "57", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/heartynote_profile_pic_Srinivas_NRN89RR3u3jCycJwh0Zjir9Pa9GoynW4fJcp1591979719.jpg", "username": "Srinivas_N"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_33836_Srinivas_NLfYFWdmUdqx2gmCCEeUz1aqPg89HdG1555012021.mp4", "star": {"action": "star", "count": 1, "is_starred": 0}, "tag": "Music Collection", "tag_id": "1047", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_33836_Srinivas_NLfYFWdmUdqx2gmCCEeUz1aqPg89HdG1555012021.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Srinivas_N", "views": "16"}, {"id": "3689", "is_saved": 0, "link": "/tv?vid=GZRIAwk381402", "note_id": "42378", "profile": {"id": "57", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/heartynote_profile_pic_Srinivas_NRN89RR3u3jCycJwh0Zjir9Pa9GoynW4fJcp1591979719.jpg", "username": "Srinivas_N"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_42378_Srinivas_NnDeRfK6ocC2FQnxas1BhqflWSlMxQd1580933390.mp4", "star": {"action": "star", "count": 3, "is_starred": 0}, "tag": "My note", "tag_id": "1047", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_42378_Srinivas_NnDeRfK6ocC2FQnxas1BhqflWSlMxQd1580933390.mp4_thumb_.jpg", "title": "Asha Pasham Full Video Song || Care Of Kancharapalem", "type": "video", "username": "Srinivas_N", "views": "255"}, {"id": "2429", "is_saved": 0, "link": "/tv?vid=NFdMeYI309438", "note_id": "34382", "profile": {"id": "1682", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_Dhruv8iTZiZyZsZkCABTM7DwpyVm01j4N3x0bQTb1501259319.png", "username": "Dhruv"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_34382_Dhruvm6WCIAuVdaKaQ1MeSllm1lOK7pNQvM1555620637.mp4", "star": {"action": "star", "count": 0, "is_starred": 0}, "tag": "Cars", "tag_id": "56", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_34382_Dhruvm6WCIAuVdaKaQ1MeSllm1lOK7pNQvM1555620637.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Dhruv", "views": "66"}, {"id": "2558", "is_saved": 0, "link": "/tv?vid=WLQyLkX311616", "note_id": "34624", "profile": {"id": "12", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_rakeshNanduqDGwAFdh8IitAYSHyA8gji4Kb07Lc7oDL491498768831.png", "username": "rakeshNandu"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_34624_rakeshNanduo9qHaIm8yrHYEdxcwiHNFmOnixbKgo1555926195.mp4", "star": {"action": "star", "count": 2, "is_starred": 0}, "tag": "Videohub", "tag_id": "1045", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_34624_rakeshNanduo9qHaIm8yrHYEdxcwiHNFmOnixbKgo1555926195.mp4_thumb_.jpg", "title": "", "type": "video", "username": "rakeshNandu", "views": "39"}, {"id": "2301", "is_saved": 0, "link": "/tv?vid=BpTnakw307512", "note_id": "34168", "profile": {"id": "1682", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_Dhruv8iTZiZyZsZkCABTM7DwpyVm01j4N3x0bQTb1501259319.png", "username": "Dhruv"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_34168_Dhruv5U4LGtHtTZe4l10xcI0FTA4j6nbmoo1555329470.mp4", "star": {"action": "star", "count": 3, "is_starred": 0}, "tag": "Dance", "tag_id": "1042", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_34168_Dhruv5U4LGtHtTZe4l10xcI0FTA4j6nbmoo1555329470.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Dhruv", "views": "73"}, {"id": "3361", "is_saved": 0, "link": "/tv?vid=UlraBPB343323", "note_id": "38147", "profile": {"id": "4741", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_SiddharthRoyLmYtpKVeGqEaWLeDqtuIoZIpRGrQrC2cZ0G1563485650.png", "username": "SiddharthRoy"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_38147_SiddharthRoym2grvtIvm0YGFaPLohDTyP0dIeyJLm1561234983.mp4", "star": {"action": "star", "count": 0, "is_starred": 0}, "tag": "FunMemes", "tag_id": "1104", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_38147_SiddharthRoym2grvtIvm0YGFaPLohDTyP0dIeyJLm1561234983.mp4_thumb_.jpg", "title": "#hahaha", "type": "video", "username": "SiddharthRoy", "views": "8"}, {"id": "2883", "is_saved": 0, "link": "/tv?vid=dffDhYS328041", "note_id": "36449", "profile": {"id": "3", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_rinacdbryXDDoBzDwKz0yMMIFjjiCpRyjod1zdXXbBBA1575122468.png", "username": "rinacdbry"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_36449_rinacdbryemIGzxgRSMfozbWdrVpdusdlvjs5sq1558278444.mp4", "star": {"action": "star", "count": 4, "is_starred": 0}, "tag": "Indian Talent", "tag_id": "1019", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_36449_rinacdbryemIGzxgRSMfozbWdrVpdusdlvjs5sq1558278444.mp4_thumb_.jpg", "title": "", "type": "video", "username": "rinacdbry", "views": "71"}, {"id": "1231", "is_saved": 0, "link": "/tv?vid=22apFb655N7", "note_id": "30295", "profile": {"id": "1682", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_Dhruv8iTZiZyZsZkCABTM7DwpyVm01j4N3x0bQTb1501259319.png", "username": "Dhruv"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_30295_DhruvR6oOYx68ng1IOKcUUKCydBj9DodAiQ1546119631.mp4", "star": {"action": "star", "count": 5, "is_starred": 0}, "tag": "Dance", "tag_id": "1042", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_30295_DhruvR6oOYx68ng1IOKcUUKCydBj9DodAiQ1546119631.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Dhruv", "views": "554"}, {"id": "1073", "is_saved": 0, "link": "/tv?vid=u802LS1s97X", "note_id": "30021", "profile": {"id": "2797", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_vowTvJ01mnNczdWN5uqe9SLfxCF6eltk39XxTXzf1546103349.png", "username": "vowTv"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_30021_vowTvJhxtWigos7ICckwfE0O5Ycq4RhgeO91545784020.mp4", "star": {"action": "star", "count": 5, "is_starred": 0}, "tag": "vowTv", "tag_id": "421", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_30021_vowTvJhxtWigos7ICckwfE0O5Ycq4RhgeO91545784020.mp4_thumb_.jpg", "title": "Awesomeness", "type": "video", "username": "vowTv", "views": "694"}, {"id": "1151", "is_saved": 0, "link": "/tv?vid=AR23177RN7j", "note_id": "30197", "profile": {"id": "12", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_rakeshNanduqDGwAFdh8IitAYSHyA8gji4Kb07Lc7oDL491498768831.png", "username": "rakeshNandu"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_30197_rakeshNanduzhiJK4Bt1EilpGEgZsT5tseIlmCYzp1546082938.mp4", "star": {"action": "star", "count": 5, "is_starred": 0}, "tag": "Videohub", "tag_id": "1045", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_30197_rakeshNanduzhiJK4Bt1EilpGEgZsT5tseIlmCYzp1546082938.mp4_thumb_.jpg", "title": "", "type": "video", "username": "rakeshNandu", "views": "368"}, {"id": "2614", "is_saved": 0, "link": "/tv?vid=UVyCeUB313182", "note_id": "34798", "profile": {"id": "4766", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_sweetysahuWD79XZF89es5GJgHXPwcYZkx1D8jtReqvmz1555277970.png", "username": "sweetysahu"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_34798_sweetysahuWI5OznNry3EGEozACHcN9cNd6IGENA1556035220.mp4", "star": {"action": "star", "count": 0, "is_starred": 0}, "tag": "Cool stuff", "tag_id": "1091", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_34798_sweetysahuWI5OznNry3EGEozACHcN9cNd6IGENA1556035220.mp4_thumb_.jpg", "title": "#LehLadakh", "type": "video", "username": "sweetysahu", "views": "15"}, {"id": "745", "is_saved": 0, "link": "/tv?vid=Xppougk225018", "note_id": "25002", "profile": {"id": "25", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic4da642a43c5b00d6f65eafa9784d7fd2.png", "username": "Vasantha"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_25002_VasantharR5L8JH2WECwoZMrFXhiReSOQ2H0q11509279308.mp4", "star": {"action": "star", "count": 6, "is_starred": 0}, "tag": "My note", "tag_id": "1", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_25002_VasantharR5L8JH2WECwoZMrFXhiReSOQ2H0q11509279308.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Vasantha", "views": "1025"}, {"id": "1860", "is_saved": 0, "link": "/tv?vid=wJBhBWG294912", "note_id": "32768", "profile": {"id": "4743", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_Arora8886hlkcS3RDsEZgBxBaG5WJhyNPkUFWdy3vUn1549213074.png", "username": "Arora888"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_32768_Arora888xw8pAfJVbJkaw5mYktDyXWrbo7IwDE1550973856.mp4", "star": {"action": "star", "count": 6, "is_starred": 0}, "tag": "Happy Moment", "tag_id": "9", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_32768_Arora888xw8pAfJVbJkaw5mYktDyXWrbo7IwDE1550973856.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Arora888", "views": "49"}, {"id": "3303", "is_saved": 0, "link": "/tv?vid=ovqJtfD342171", "note_id": "38019", "profile": {"id": "57", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/heartynote_profile_pic_Srinivas_NRN89RR3u3jCycJwh0Zjir9Pa9GoynW4fJcp1591979719.jpg", "username": "Srinivas_N"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_38019_Srinivas_N0WC0QYkVG5MGm4Cv4IkGgLh73IqJ5x1561134232.mp4", "star": {"action": "star", "count": 3, "is_starred": 0}, "tag": "Music Collection", "tag_id": "1047", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_38019_Srinivas_N0WC0QYkVG5MGm4Cv4IkGgLh73IqJ5x1561134232.mp4_thumb_.jpg", "title": "Unnattundi - Ninnu Kori", "type": "video", "username": "Srinivas_N", "views": "24"}]);
    setTrendingVideos([{"id":"3731","note_id":"43147","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_43147_fashionTVtX53Q8AyghwFKHqVQlBSBfWZlC9ucb1591922862.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_43147_fashionTVtX53Q8AyghwFKHqVQlBSBfWZlC9ucb1591922862.mp4","link":"\/n\/fIihEbX388323","views":"35"},{"id":"3730","note_id":"43146","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_43146_fashionTVsBL1VSOTU8zS3wI7GYotaLa9UF2gE31591922851.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_43146_fashionTVsBL1VSOTU8zS3wI7GYotaLa9UF2gE31591922851.mp4","link":"\/n\/hAUsYbg388314","views":"98"},{"id":"3729","note_id":"43145","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_43145_fashionTVOg1s8tnwwvmL1dXMNJG6KEmxucd6eR1591922832.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_43145_fashionTVOg1s8tnwwvmL1dXMNJG6KEmxucd6eR1591922832.mp4","link":"\/n\/RRJFbGk388305","views":"76"},{"id":"3598","note_id":"40397","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_40397_fashionTVCKZF12iy0uh6NE9hlPMU2sL9OtXU6X1564000914.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_40397_fashionTVCKZF12iy0uh6NE9hlPMU2sL9OtXU6X1564000914.mp4","link":"\/n\/sKPeHaJ363573","views":"11"},{"id":"3597","note_id":"40396","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_40396_fashionTV46QCFc4CAZeSyjYI8vu8dBJ6TZu9M01564000904.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_40396_fashionTV46QCFc4CAZeSyjYI8vu8dBJ6TZu9M01564000904.mp4","link":"\/n\/pntnPBe363564","views":"25"},{"id":"3596","note_id":"40395","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_40395_fashionTVu89bNoEJjRggATdFfrwfl5UnUaySKz1564000894.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_40395_fashionTVu89bNoEJjRggATdFfrwfl5UnUaySKz1564000894.mp4","link":"\/n\/QnjYEah363555","views":"19"},{"id":"3595","note_id":"40394","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_40394_fashionTVOaE0lVgUHbwoL0CoVEjb6x3yz5C1Ji1564000876.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_40394_fashionTVOaE0lVgUHbwoL0CoVEjb6x3yz5C1Ji1564000876.mp4","link":"\/n\/bcdyHJF363546","views":"9"},{"id":"3594","note_id":"40393","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_40393_fashionTVAEuidMLrm3YhQJJautydqVSukMTUvH1564000866.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_40393_fashionTVAEuidMLrm3YhQJJautydqVSukMTUvH1564000866.mp4","link":"\/n\/vVvELPc363537","views":"9"},{"id":"3554","note_id":"39942","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_39942_fashionTVW4HWuFeF9kcMdSRWDOVmYXRQvUTGSW1563285988.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_39942_fashionTVW4HWuFeF9kcMdSRWDOVmYXRQvUTGSW1563285988.mp4","link":"\/n\/CccjYcF359478","views":"18"},{"id":"3553","note_id":"39941","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_39941_fashionTVIGDsKjSvcfB3tPv8oNQjGyarCO8Cy21563285977.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_39941_fashionTVIGDsKjSvcfB3tPv8oNQjGyarCO8Cy21563285977.mp4","link":"\/n\/dHKaMVF359469","views":"15"},{"id":"3552","note_id":"39940","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_39940_fashionTVmNWV6cBYM2J4FqKSn5RddsFzhIUTHQ1563285971.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_39940_fashionTVmNWV6cBYM2J4FqKSn5RddsFzhIUTHQ1563285971.mp4","link":"\/n\/RcrFZWS359460","views":"59"},{"id":"3551","note_id":"39939","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_39939_fashionTVHd2fHYtFW5PtCxAUVGBdc0YIHOcPO81563285952.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_39939_fashionTVHd2fHYtFW5PtCxAUVGBdc0YIHOcPO81563285952.mp4","link":"\/n\/KRygZWR359451","views":"15"},{"id":"3550","note_id":"39938","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_39938_fashionTVs27kFbJ3JpOZzAaMPMH46rU210mYYz1563285934.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_39938_fashionTVs27kFbJ3JpOZzAaMPMH46rU210mYYz1563285934.mp4","link":"\/n\/EfqWXkT359442","views":"12"},{"id":"3549","note_id":"39937","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_39937_fashionTVv9WFgpv1Its51AKKzvX3GUHWQA8QDS1563285922.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_39937_fashionTVv9WFgpv1Its51AKKzvX3GUHWQA8QDS1563285922.mp4","link":"\/n\/WUkacMz359433","views":"13"},{"id":"3548","note_id":"39936","thumb":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_39936_fashionTVVIJUwb3FRAx4Ngstk1r662MUqclq5y1563285907.mp4_thumb_.jpg","src":"https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_39936_fashionTVVIJUwb3FRAx4Ngstk1r662MUqclq5y1563285907.mp4","link":"\/n\/uvwZUkm359424","views":"14"}]);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const onContentSizeChange = (contentWidth, contentHeight) => {
    // this.setState({ screenHeight: contentHeight });
  };

  const onTrendingSizeChange = () => {};

  return (
    <>
      <View style={Styles.header}>
        <TouchableOpacity
          style={[Styles.recordIconContainer, Styles.profileIconContainer]}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Image
            source={{
              uri:
                "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_pic/rinacdbrykiF5QB94rMp3u7qVrtFceRHKSekRIW52fL81580635285.jpg",
            }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 120,
            }}
          />
        </TouchableOpacity>
        <Text style={Styles.homeTitle}>Welcome !</Text>
      </View>
      <ScrollView
        scrollEnabled={true}
        onContentSizeChange={onTrendingSizeChange}
        style={{
          marginBottom: 57,
          paddingBottom: 50,
        }}
      > 
        <View style={Styles.mainContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            onContentSizeChange={onTrendingSizeChange}
          >
            <View style={Styles.peopleTrendingFeed}>
              {trendingPeople.map((item, idx) => {
                return (
                  <TouchableOpacity key={`${idx}-trending-people`} style={Styles.peopleTrendingCard}>
                    <Image
                      source={{ uri: item.profile.pic }}
                      style={Styles.trendingPic}
                    />
                    <Text style={Styles.trendingUsername}>
                      {item.profile.username.length > 10 ? item.profile.username.substr(0, 10)+'..' : item.profile.username}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <Text style={Styles.homeTitle}>Trending</Text>
          <ScrollView
            horizontal={true}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={onContentSizeChange}
          >
            <View style={Styles.videoFeed}>
              {trendingVideos.map((item, idx) => {
                return (
                  <TouchableOpacity style={Styles.videoCard} key={`${idx}-trending-clips`}>
                    <Image
                      source={{ uri: item.thumb }}
                      style={Styles.videoCover}
                    />
                    <View style={Styles.videoWrapper}>
                      <Image source={PlayIcon} style={Styles.PlayIcon} />

                      <View style={Styles.videoDetails}>
                        <Text style={[Styles.videoTitle, Styles.videoTitleRed]}>Wittyclip</Text>
                        <Text style={Styles.videoTitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}

const Styles = StyleSheet.create({
  profileIconContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    zIndex: 1, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: "absolute",
    top: 50,
    left: 30,
    zIndex: 1, 
  },
  trendingPic: {
    height: 64,
    width: 64,
    maxHeight: 64,
    maxWidth: 64,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#aaa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 10,
  },
  trendingUsername: {
    color: "#999",
    fontSize: 8,
    fontFamily: "Capriola-Regular",
    marginVertical: 5,
    textAlign: 'center',
    maxWidth: 50,
  },
  homeTitle: {
    fontSize: 30,
    fontFamily: "Capriola-Regular",
    fontWeight: "500",
    color: "#fff",
    paddingLeft: 20,
    marginTop: 5,
  },
  mainContainer: {
    marginTop: 110,
  },
  peopleTrendingFeed: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    marginRight: 16,
  },
  peopleTrendingCard: {
    position: "relative",
    borderRadius: 120,
    height: 110,
    marginLeft: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  videoFeed: {
    marginVertical: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  videoCard: {
    position: "relative",
    width: screenDimensions.ScreenWidth * 0.60,
    height: screenDimensions.ScreenHeight - 380,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 24,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  videoCover: {
    width: "100%",
    height: screenDimensions.ScreenHeight - 380,
    resizeMode: "cover",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11
  },
  videoWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: screenDimensions.ScreenHeight - 380,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  PlayIcon: {
    height: 30,
    width: 30,
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  videoDetails: {
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 0,
    zIndex: -1,
    borderRadius: 20,
  },
  videoDetails2: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 12,
    color: "#aaa",
    maxHeight: 12,
    fontFamily: "Capriola-Regular",
    marginBottom: 16,
    maxWidth: '60%'
  },
  videoTitleRed: {
    color: '#ffffff',
    fontSize: 20,
    maxHeight: 20,
    fontFamily: "Capriola-Regular",
    marginBottom: 8,
  }
});

export default HomeTab;
