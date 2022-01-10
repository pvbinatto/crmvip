import { Component, OnInit } from '@angular/core';
import { ContatosService } from 'src/app/services/contatos.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(private contactService: ContatosService) {}

  ngOnInit(): void {

    this.contactService.getClientes().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => console.error(e),
      complete: () => console.info(),
    });
  }
}
