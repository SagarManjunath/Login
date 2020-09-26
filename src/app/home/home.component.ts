import { Component, OnInit } from '@angular/core';
import  *  as  movieList  from  '../data/movies.json';
import { Movie } from "../model/movie";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[];
  CurrentUser: any;
  Email:string;

  constructor() { }

  ngOnInit() {
    this.CurrentUser=JSON.parse(localStorage.getItem('currentUser'));
    this.Email=this.CurrentUser.email;
    this.movies=movieList['default'];
    console.log(movieList);
  }

}
