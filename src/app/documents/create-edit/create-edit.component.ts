import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const fileId = params.get('id');
      if (fileId) {
        // Modifica del file con ID fileId
        console.log('Modifica del file con ID:', fileId);
      } else {
        // Creazione di un nuovo file
        console.log('Creazione di un nuovo file');
      }
    });
  }

}
