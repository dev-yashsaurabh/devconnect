Signals may be either writable or read-only.

Writable signal:

const count = signal(0);
count.set(3);
console.log(count());

count.update(prev => prev+1);

An effect is an operation that runs whenever one or more signal values change. You can create an effect with the effect function:

Effect Use Cases: 

    Logging data being displayed and when it changes, either for analytics or as a debugging tool.
    Keeping data in sync with window.localStorage.
    Adding custom DOM behavior that can't be expressed with template syntax.
    Performing custom rendering to a <canvas>, charting library, or other third party UI library.

Avoid using effects for propagation of state changes.
Result: This can result in ExpressionChangedAfterItHasBeenChecked errors, infinite circular updates, or unnecessary change detection cycles.
- Instead, use computed signals to model state that depends on other state.

private loggingEffect = effect(() => {    
    console.log(`The count is: ${this.count()}`);  
});

- Advance topic
if signal is with equal option
const count = signal(['test], {equal: _.isEqual})
count.set(['test'])
- it will check deeply if value is same then it won't trigger update. Above line changing reference but array is same so won't trigger

const count = signal(['test])
count.set(['test'])

- Reference changed now trigger update.

- Equality functions can be provided to both writable and computed signals.


- untracked is used to remove dependency.
- effect(() => {
  console.log(`User set to ${currentUser()} and the counter is ${untracked(counter)}`);
});

- untracked outer code dependency.
- effect(() => {
  const user = currentUser();
  untracked(() => {
    // If the `loggingService` reads signals, they won't be counted as
    // dependencies of this effect.
    this.loggingService.log(`User set to ${user}`);
  });
});

- onCleanup function will run when effect is destroyed or before next run of effect.
effect((onCleanup) => {
  const user = currentUser();
  const timer = setTimeout(() => {
    console.log(`1 second ago, the user became ${user}`);
  }, 1000);
  onCleanup(() => {
    clearTimeout(timer);
  });
});
