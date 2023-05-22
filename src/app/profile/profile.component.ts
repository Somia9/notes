import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NoteService } from '../note.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {



  userInfo:any;
  token=JSON.parse(localStorage.getItem('userData')!);

  noteId:any;
  delId:any;
  showId:any;
  noteFormInfo:any;
  notesArray:any[]=[];

  constructor(private _NoteService:NoteService,private _AuthService:AuthService ){ };








addNoteForm:FormGroup=new FormGroup({
    title: new FormControl(),
    desc: new FormControl()
  });

updateForm:FormGroup=new FormGroup({
  title: new FormControl(),
    desc: new FormControl()
})
ngOnInit(): void {

    this.userInfo= this._AuthService.userData.getValue();

    this.getAllNotes()

}

addFun(data:any){
  this.noteFormInfo=this.addNoteForm.value
  //  console.log(data.value);
  // console.log(this.noteFormInfo)

  let note={
    title:this.noteFormInfo.title,
    desc:this.noteFormInfo.desc,
    citizenID:this.userInfo._id,
    token:this.token
  }
  console.log(note)

  this._NoteService.addNote(note).subscribe({
   next:(response)=>{
    console.log(response);
    this.getAllNotes()
    }
  })
// this.addNoteForm.reset()
}

edit(id:any){
  this.noteId=id;
  console.log(this.noteId)
}

update(){
  let updateObj={
    "title":this.updateForm.value.title,
    "desc":this.updateForm.value.desc,
    "NoteID":this.noteId,
    "token":this.token
  }
  this._NoteService.updateNote(updateObj).subscribe({
    next:(res)=>{
      if (res.message =='updated') {
       this.getAllNotes()
      }
    }
  })
}

del(id:any){
  this.delId=id;
}
delete(){
   let deletObj={
    "NoteID":this.delId,
      "token":this.token
   }

   this._NoteService.deleteNote(deletObj).subscribe((res)=>{
    if (res.message == 'deleted') {

      this.getAllNotes();
      (document.getElementById('close') as HTMLElement).click()

   }})
}

getAllNotes(){
    let getObj={
      'userID':this.userInfo._id,
      'token':this.token,
      // 'userID':"5ed2960071fb8f001781e34b",
      // "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RmZDZjMmVlYTc0ODAwMDg4ZjhmZGYiLCJmaXJzdF9uYW1lIjoiQm9keSIsImxhc3RfbmFtZSI6IkFobWVkIiwiZW1haWwiOiJib2R5QGdtYWlsLmNvbSIsImFnZSI6MjIsIl9fdiI6MCwiaWF0IjoxNjc3Mjc1NzEwfQ.FCJ1Sk46lZbTZpRg7b04wA_1Bir_2_Yt6n2hc-c-oz0"

    }
    // console.log(getObj)

    this._NoteService.getUserNotes(getObj).subscribe({
      next:(response)=>{

       this.notesArray=response.Notes
       console.log(response.Notes)
      }

    })
}

setvalue(data:any){
 this.updateForm.controls['title'].setValue(data.title);
 this.updateForm.controls['desc'].setValue(data.desc);
}
}
