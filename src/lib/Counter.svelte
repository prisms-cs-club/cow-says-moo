<script>let counter = 1;</script>
<button on:click={() => counter++}>Click me!</button>
<p>Value of counter: {counter}</p>
<span class="countdown">
    <span style="--value:${counter};"></span>
  </span>
