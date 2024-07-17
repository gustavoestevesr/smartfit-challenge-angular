import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../../models/units-response.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-card-unit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-unit.component.html',
  styleUrl: './card-unit.component.scss'
})
export class CardUnitComponent implements OnInit {
  @Input() unit!: Location;
  sanitizedContent!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Sanitizar o conteúdo quando o componente for inicializado
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.unit.content);
  }
}
