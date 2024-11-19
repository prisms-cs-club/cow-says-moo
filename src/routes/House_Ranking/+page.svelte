<script>
let ettl_score = 500
let hobler_score = 200
let albermarle_score = 300
</script>
<p><progress class="progress progress-success w-56" value={ettl_score} max="1000"></progress></p>
<p><progress class="progress progress-error w-56" value={hobler_score} max="1000"></progress></p>
<p><progress class="progress progress-warning w-56" value="40" max="100"></progress></p>
<p><progress class="progress progress-info w-56" value="100" max="100"></progress></p>
<p><progress id="id1" class="progress w-56" value="70" max="100"></progress></p>

<style>
    #id1 {
        background: #ffff97;
    }
    .progress {
        position: relative;
        width: 80%;
        left: 10%;
        appearance: none;
        overflow: hidden;
        height: 2.5rem /* 8px */;
        border-radius: var(--rounded-box, 1rem /* 16px */);
        background-color: var(--fallback-bc,oklch(var(--bc)/0.1));
    }
    .progress-success::-moz-progress-bar {
        border-radius: var(--rounded-box, 1rem /* 16px */);
        --tw-bg-opacity: 1;
        background-color: var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)));
        
    }
    .progress-success:indeterminate {
        --progress-color: var(--fallback-su,oklch(var(--su)/1));
    }
    .progress-success::-webkit-progress-value {
        --tw-bg-opacity: 1;
        background-color: var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)));
    }
</style>