import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';

import { Item } from '../model/item';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  private itemCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  /* https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md */

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.itemCollection = afs.collection<Item>('items');
    this.items = this.itemCollection.valueChanges();
  }

  myTestForm = this.fb.group({
    text: [''],
  });

  myText: Item = {
    name: '',
  };

  ngOnInit(): void {}

  onSubmit() {
    const myString = this.myTestForm.get('text')?.value;

    if (myString) {
      this.myText.name = myString;
    }

    this.addItem(this.myText);
  }

  addItem(item: Item) {
    this.itemCollection.add(item);
  }
}
