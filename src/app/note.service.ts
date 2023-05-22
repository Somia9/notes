import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient:HttpClient) { }

  addNote(data:object):Observable<any>
  {
    return this._HttpClient.post(`https://sticky-note-fe.vercel.app/addNote`,data)
  }

  getUserNotes(data:any):Observable<any>
  {
    return this._HttpClient.post('https://sticky-note-fe.vercel.app/getUserNotes',data)
  }

  updateNote(data:any):Observable<any>
  {
    return this._HttpClient.put('https://sticky-note-fe.vercel.app/updateNote',data)
  }

  deleteNote(data:any):Observable<any>
  {
    let options={
       body:{
      "NoteID":data.NoteID,
      "token":data.token
       }
    }
    return this._HttpClient.delete('https://sticky-note-fe.vercel.app/deleteNote',options)
  }
}



// https://sticky-note-fe.vercel.app/addNote

// https://route-egypt-api.herokuapp.com/addNote

//https://route-note-api.vercel.app
