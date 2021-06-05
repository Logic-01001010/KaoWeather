import React from "react";
import axios from 'axios';
import useState from 'react';

import sun from './icon/sun.gif';
import cloudySun from './icon/sun.gif';
import cloudy from './icon/sun.gif';
import cloudyCloudy from './icon/mist.gif';
import rainCloudy from './icon/rain.gif';
import rainSun from './icon/rain.gif';
import thunder from './icon/rain.gif';
import winter from './icon/snow.gif';
import mist from './icon/mist.gif';

import hot from './icon/hot.gif';

import bg_clear from './background/clear.jpg';
import bg_mist from './background/mist.jpg';
import bg_rain from './background/rain.jpg';
import bg_snow from './background/snow.jpg';


export default class app extends React.Component{

    state = {
    description: [],
    icon: [],
    name: [],
    temp: [],
    temp_max: [],
    temp_min: [],
    humidity: [],
    };

  
    componentDidMount(){

        function change_background(arg){

            console.log(arg)

            switch(arg){
                // clear
                case ('01d'):
                case ('01n'):
                case ('02d'):
                case ('02n'):
                case ('03d'):
                case ('03n'):
                    document.body.style = "background-image: url("+bg_clear+")";
                    document.getElementsByClassName('icon')[0].style.background = "rgb(0, 183, 255)";
                    break;
                
                // mist
                case ('04d'):
                case ('04d'):
                case ('50d'):
                case ('50n'):
                    document.body.style = "background-image: url("+bg_mist+")";
                    document.getElementsByClassName('icon')[0].style.background = "#c7c7c7";
                    document.querySelector('.icon > h1').style.color = "black";
                    break;

                // rain
                case ('09d'):
                case ('09n'):            
                case ('10d'):
                case ('10n'):
                case ('11d'):
                case ('11n'):
                    document.body.style = "background-image: url("+bg_rain+")";
                    document.getElementsByClassName('icon')[0].style.background = "#c7c7c7";
                    document.querySelector('.icon > h1').style.color = "black";
                    break;
                    
                // snow
                case ('13d'):
                case ('13n'):
                    document.body.style = "background-image: url("+bg_snow+")";
                    document.getElementsByClassName('icon')[0].style.background = "white";
                    document.querySelector('.icon > h1').style.color = "black";
                    break;   


            }

            //document.body.style = "background:red";

        }

        function translate_description(origin){

            var dict = {
                'overcast clouds':'구름 잔뜩',
                'clear sky':'맑음',
                'few clouds':'구름 약간',
                'scattered clouds':'구름 흩어짐',
                'broken clouds':'부서진 구름',
                'shower rain':'소나기',
                'rain':'비',
                'moderate rain':'장마',
                'thunderstorm':'번개',
                'snow':'눈',
                'mist':'안개',
                'fog':'안개',
                'smoke':'스모그',
                'haze':'연무',
                'dust':'먼지',
                'Sand':'황사',
                'ash':'재',
                'Squall':'돌풍',
                'Tornado':'토네이도',
                'light rain':'이슬비',
            }


            return dict[origin];
        }

        function get_icon(arg){

            change_background(arg);

            var dict = {
                '01d':sun, // clear
                '01n':sun, // clear
                '02d':cloudySun, // clear
                '02n':cloudySun, // clear
                '03d':cloudy, // clear
                '03n':cloudy, // clear
                '04d':cloudyCloudy, // mist
                '04n':cloudyCloudy, // mist
                '09d':rainCloudy, // rain
                '09n':rainCloudy, // rain
                '10d':rainSun, // rain
                '10n':rainSun, // rain
                '11d':thunder, // rain
                '11n':thunder, // rain
                '13d':winter, // snow
                '13n':winter, // snow
                '50d':mist, // mist
                '50n':mist, // mist
            }




            return dict[arg];
        }
    

        axios.get('http://api.openweathermap.org/data/2.5/weather?units=metric&q=Seoul&appid=3429d0bae34e94e664e52d8c910f7341') // 3429d0bae34e94e664e52d8c910f7341
        .then(res => {
            console.log(res);


            this.setState({description: translate_description(res.data.weather[0].description)})
            this.setState({icon: get_icon(res.data.weather[0].icon)})
            
            this.setState({name: res.data.name})
            this.setState({temp: Math.floor(res.data.main.temp)})
            this.setState({temp_max: Math.floor(res.data.main.temp_max)})
            this.setState({temp_min: Math.floor(res.data.main.temp_min)})
            this.setState({humidity: res.data.main.humidity})
            

            
            if (this.state.temp >= '36') // 온도가 36도 이상이면 핫 아이콘으로
            {
                this.setState({icon: hot});
            }
            else if(this.state.temp <= '12') // 온도가 12도 이하이면 윈터 아이콘으로
            {
                this.setState({icon: winter});
            }


        })
    }

    render(){
   

        

        return(

            <div className="box">


                <div className="icon">
                    <h1>{this.state.name}</h1>
                    <br></br>
                    <img src={this.state.icon}></img>
                    <br/>
                    <h2>{this.state.temp}°C</h2>
                    <br/>
                </div>

                <br/>

                <div className="inner-box">

       
                        <h3 id="test">{this.state.description}</h3>
                        <hr/>
                        <p>최고 온도: {this.state.temp_max}°C ▲</p>
                        <p>최저 온도: {this.state.temp_min}°C ▼</p>
                        <p>습도: {this.state.humidity}% 💧</p>
                        <br></br>
                </div>

            </div>

        )
    }

}