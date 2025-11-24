import { Component, computed, isSignal, Signal, signal, WritableSignal } from "@angular/core";

@Component({
    selector: 'dev-signal',
    templateUrl: './dev-signal.html',
    styleUrl: './dev-signal.scss'
})
export class DevSignal {
    constructor() {
        const count = signal(0);
        // const count: WritableSignal<number> = signal(0);
        // same as above

        count.set(3);
        console.log(count());
        count.update(prev => prev+1);

        const count2: WritableSignal<number> = signal(0);
        const doubleCount: Signal<number> = computed(() => count2() * 2);
        // double count is read only signal because it depends on count2 that's why it has type Signal
        // computed signal usecase: filtering arrays

        const showCount = signal(false);
        const count3 = signal(0);
        const conditionalCount = computed(() => {
            if (showCount()) {
                return `The count is ${count3()}.`;
            } else {
                return 'Nothing to see here!';
            }
        });
        count3.set(4);
        showCount.set(true);
        console.log(conditionalCount())
        console.log(isSignal(count3)) // to check value is a signal or not
        console.log(isWritableSignal(count));
        // count3 don't have dependency if showCount is false
    }
}
function isWritableSignal(count: WritableSignal<number>) {
    throw new Error("Function not implemented.");
}

