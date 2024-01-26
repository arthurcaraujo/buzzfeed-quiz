import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        MainComponent,
        RouterOutlet
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'buzzfeed-quiz';
}