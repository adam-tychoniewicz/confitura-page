import {Component} from "@angular/core";
import {PersonModalService} from "./person-modal.service";
import "./person-modal.component.scss";
import {User} from "../../pages/profile/user.model";
import {Presentation} from "../../profile/shared/presentation.model";
import {Router} from "@angular/router";
@Component({
    selector: "jl-person-modal",
    templateUrl: "./person-modal.component.html"
})
export class PersonModalComponent {
    model: User;

    constructor(service: PersonModalService, private router: Router) {
        service.changed.subscribe((user: User) => {
            this.model = user;
            if (user) {
                this.openModal();
            } else {
                this.closeModal();
            }
        });
    }

    goTo(presentation: Presentation) {
        this.closeModal();
        this.router.navigate(["/admin2/presentations"], {fragment: presentation.id})
    }

    addPresentation(){
        this.closeModal();
        this.router.navigate([`/user/${this.model.id}/presentation`]);
    }

    private closeModal() {
        $(".modal").modal("hide");
    }

    private openModal() {
        $(".modal").modal({show: true});
    }


}