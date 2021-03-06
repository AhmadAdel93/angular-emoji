import {Component, OnInit, OnChanges, Input, Output, EventEmitter, Pipe, NgZone} from '@angular/core';
import { Emotions } from "./default-emotion";
import { EmojiService } from "./emoji.service"

@Component({
  selector: 'emoji-input',
  templateUrl: './emoji.html',
  styleUrls: ['./emoji.css'],
    providers: [EmojiService]
})
export class EmojiComponent implements OnInit, OnChanges  {

  constructor(public emojiService: EmojiService) {}


 /* @Input() popupAnchor = 'top';
  //@Input() onEnter: Function = ($event) => { this.input = ''; this.modelChange.emit(this.input); $event.preventDefault(); $event.target.blur(); console.log('on enter'); };
  @Input() model: any;
  @Output() modelChange: any = new EventEmitter();
*/
  input: string;
  filterEmojis: string;
  allEmojis: Array<any>;
  popupOpen: boolean = false;
  chatText;

  onEnter($event){
    $event.preventDefault();
    $event.target.blur();
    // remove extra lines
      console.log("outer text", $event.target.outerText);
      console.log("inner Text", $event.target.innerText);
      console.log("outer html", $event.target.outerHTML);
      console.log("inner html", $event.target.innerHTML);
    var text = $event.target.outerText.replace(/(\r\n|\n|\r)/gm,"");
    console.log("text",text);
    //$event.target.innerText = '';
    this.input = '';
   // this.modelChange.emit(this.input);
    console.log('on enter');
    this.emojiService.setChatText(text);
  }

  category = [];

  symbols = [];
  nature = [];
  objects = [];
  people = [];
  food = [];
  activity = [];
  regional = [];
  travel = [];


  ngOnInit() {
    this.input = '';
    this.filterEmojis = '';
    // this.allEmojis = JSON.parse(Emotions);
    this.allEmojis = Object.keys(Emotions).map(key => Emotions[key]);

    for(var i = 0; i < this.allEmojis.length; i++){
      if(this.allEmojis[i].category == "symbols"){
          this.symbols.push(this.allEmojis[i]);
      }else if( this.allEmojis[i].category ==  "nature"){
        this.nature.push(this.allEmojis[i]);
      }else if(this.allEmojis[i].category == "objects"){
        this.objects.push(this.allEmojis[i]);
      }else if(this.allEmojis[i].category == "people"){
        this.people.push(this.allEmojis[i]);
      }else if(this.allEmojis[i].category == "food"){
        this.food.push(this.allEmojis[i]);
      }else if(this.allEmojis[i].category == "activity"){
        this.activity.push(this.allEmojis[i]);
      }else if(this.allEmojis[i].category == "regional"){
        this.regional.push(this.allEmojis[i]);
      }else if(this.allEmojis[i].category == "travel"){
        this.travel.push(this.allEmojis[i]);
      }
    }

  }

  ngOnChanges() {
    console.log('ngonchange');
    /*if (this.model !== this.input) {
      this.input = this.model;
    }*/
  }

  togglePopup() {
    this.popupOpen = !this.popupOpen;
  }

  getFilteredEmojis() {
    return this.allEmojis.filter((e) => {
      if (this.filterEmojis === '') {
        return true;
      } else {
        for (let alias of e.aliases) {
          if (alias.includes(this.filterEmojis)) {
            return true;
          }
        }
      }
      return false;
    });
  }

  onEmojiClick(e) {
    console.log('onEmojiclick');
    this.input = this.input + '<img src="../../assets/images/emoji/png/' + e.code_points.base + '.png" style="width:28px">';
    //this.input = this.input + ' ' + e.shortname;
    //this.modelChange.emit(this.input);
    this.popupOpen = false;
  }

  onChange($event) {
    console.log('on change!');
    this.input = $event.target.innerHTML; // JSON.parse(Emotions);
   // this.model = this.input;
    //this.modelChange.emit(this.input);
  }

    transform(value: any, args: any[] = null): any {
        return this.chatText; // .map(key => value[key]);
    }

}
