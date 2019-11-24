import { Component, OnInit, Input } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  value:string = "";
  letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  nums = [10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 14, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38];
  word:string = "";
  masLetters = [];
  masNums = [];
  newMas = [];
  masAfterMult = [];
  numberContainer:string;
  infoContainer:any;
  idContainer:any;
  ownerContainer:string;
  historyContainer = [];


  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  onChange(){
    let reg = /[A-Z]{4}[0-9]{6}$/;
    let res = reg.test(this.value);
    if(!res){
      alert("Неверный номер контейнера");
      this.value = "";
      return false;
    }

    this.word = this.value.substring(0, 4);
    for (let i=0; i<this.word.length; i++){
      for (let j=0; j<this.letters.length; j++){
        if (this.word[i] === this.letters[j]){
          this.masLetters.push(this.nums[j]);
        }
      }
    }

    this.masNums = this.value.substring(4, 10).split("");
    for (let i=0; i<this.masNums.length; i++){
      this.masNums[i] = Number(this.masNums[i]);
    }

    this.newMas = [].concat(this.masLetters, this.masNums);

    for (let i=0; i<this.newMas.length; i++){
      this.masAfterMult[i] = this.newMas[i] * (2**i);
    }

    let total = this.masAfterMult.reduce((a, b) => a + b);
    let totalDiv = total%11;
    if(totalDiv === 10){
      totalDiv = 0;
    }
    this.numberContainer = this.value + totalDiv.toString();

    this.http.get('https://www.mocky.io/v2/5da06f143000002b00f89e96?numer={this.numberContainer}')
    .subscribe((data) => {
      this.infoContainer = data;
      this.idContainer = this.infoContainer.id;
      this.ownerContainer = this.infoContainer.owner;
      this.historyContainer = this.infoContainer.history;
    });    
    
    this.value = "";
  }  

  clear(){
    this.value = '';
  }

}
