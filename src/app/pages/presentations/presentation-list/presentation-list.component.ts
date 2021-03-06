import {Component, OnInit} from "@angular/core";
import {PresentationService} from "../../../profile/shared/presentation.service";
import {Presentation} from "../../../profile/shared/presentation.model";
import "./presentation-list.component.scss";
import {PersonModalService} from "../../../persons/person-modal/person-modal.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../profile/user.service";
import {User} from "../../profile/user.model";
@Component({
    templateUrl: "./presentation-list.component.html"
})
export class PresentationListComponent implements OnInit {


    list: Presentation[];
    private presentationId: string;

    constructor(private service: PresentationService, private personModalService: PersonModalService, private userService: UserService, route: ActivatedRoute) {
        route.fragment
            .subscribe(presentationId => {
                this.presentationId = presentationId;
                this.scrollToSelectedPresentation();
            });
    }

    ngOnInit(): void {
        this.service.getAll()
            .subscribe((list) => {
                this.list = list;
                setTimeout(() =>
                    this.scrollToSelectedPresentation());
            })
    }


    accept(presentation: Presentation) {
        this.service.accept(presentation)
            .subscribe(() => this.ngOnInit());
    }

    unaccept(presentation: Presentation) {
        this.service.unaccept(presentation)
            .subscribe(() => this.ngOnInit());

    }


    show(speaker: User) {
        this.userService.getBy(speaker.id)
            .subscribe(user => this.personModalService.showFor(user));
    }

    allSpeakersFor(presentation: Presentation): User[] {
        let speakers = [presentation.speaker];
        if (presentation.cospeakers) {
            speakers = speakers.concat(presentation.cospeakers);
        }
        return speakers;
    }

    private scrollToSelectedPresentation() {
        if (this.presentationId) {
            const element = document.getElementById(this.presentationId);
            if (element) {
                window.scrollTo(0, element.offsetTop - 100);
            }

        }
    }


}