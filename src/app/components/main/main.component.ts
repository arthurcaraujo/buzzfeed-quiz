import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { questions, results } from "../../../assets/data/quiz-questions.json";

@Component({
    selector: "app-main",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./main.component.html",
    styleUrl: "./main.component.css"
})
export class MainComponent implements OnInit {
    answersArray: string[] = [];
    finished: boolean = false;
    questionIndex: number = 0;
    questionMaxIndex: number = 0;
    selectedAnswer: string = "";
    selectedImg: string = "";
    selectedQuestion: any;
    start: boolean = false;

    ngOnInit(): void {
        this.selectedQuestion = questions[this.questionIndex];
        this.questionMaxIndex = questions.length;
    }

    startQuiz = () => this.start = true;

    restartQuiz() {
        this.answersArray = [];
        this.finished = false;
        this.questionIndex = 0;
        this.selectedAnswer = "";
        this.selectedImg = "";
        this.selectedQuestion = questions[this.questionIndex];
        this.start = false;
    }

    chooseAnswer(option: string[]) {
        this.answersArray = [...this.answersArray, ...option];
        console.log(this.answersArray);
        this.nextStep();
    }

    async nextStep(){
        this.questionIndex++;

        if (this.questionMaxIndex > this.questionIndex){
            this.selectedQuestion = questions[this.questionIndex];
        } else {
            const finalAnswer: string = await this.checkResult(this.answersArray);
            this.finished = true;
            for (let i = 0; i < results.length; i++) {
                if (results[i].id === finalAnswer) {
                    this.selectedAnswer = results[i].name;
                    this.selectedImg = results[i].img;
                }
            }
        }
    }

    checkResult(anwsers: string[]) {
        const result = anwsers.reduce((previous, current, i, arr) => {
            if (arr.filter(item => item === previous).length >
                arr.filter(item => item === current).length
            ){
                return previous;
            } else {
                return current;
            }
        })
        return result;
    }
}