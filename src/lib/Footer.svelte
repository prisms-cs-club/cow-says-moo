<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let _a = 0;
	let _b = false;

	const _d = (i: number) => {
		const _e = [
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluL1BpeFBpbl8yMDI1LTAxLTI2XzE5LTE1LTMzLnBuZz9yYXc9dHJ1ZQ==',
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluLzBiZjA2ZGQ5N2FkMWYxZmM5ZWY1ZWNiNjMwMmQ0OGQxMTM0MDE5MDgyMS5wbmc/cmF3PXRydWU=',
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluL1BpeFBpbl8yMDI1LTAyLTExXzE3LTQ0LTU5LnBuZz9yYXc9dHJ1ZQoK',
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluL1BpeFBpbl8yMDI1LTAyLTExXzE3LTQ2LTA3LnBuZz9yYXc9dHJ1ZQ==',
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluLzM1MGM1NGUzM2MzYTFjZThhOGE4NjM2OTM0M2Q0YmVkMjg2NDMxMDQ1LmpwZz9yYXc9dHJ1ZQ==',
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluL1BpeFBpbl8yMDI1LTAxLTI2XzE5LTE2LTM1LnBuZz9yYXc9dHJ1ZQo=',
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluL1BpeFBpbl8yMDI1LTAxLTI2XzE5LTE2LTQzLnBuZz9yYXc9dHJ1ZQ=='
		];
		return atob(_e[i]);
	};

	let _f = '';

	const _g = () => {
		return {
			track: (evt: string) => {
				if (evt === 'footer') {
					_a = (_a + 1) % 7;
					if (_a === 6) {
						_b = true;
						_f = _d(Math.floor(Math.random() * 7));
					}
				}
			}
		};
	};

	const analytics = _g();

	let _h = 0;

	function _i(event: MouseEvent) {
		const now = Date.now();
		if (now - _h < 100) return;
		_h = now;
		analytics.track('footer');
	}

	function _j(event: MouseEvent) {
		const target = event.target as Element;
		if (_b && target && !target.closest('footer')) {
			_b = false;
		}
	}

	onMount(() => {
		if (browser) {
			document.addEventListener('click', _j);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', _j);
		}
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<footer class="no-select footer bg-base-200 p-10 text-base-content" on:click|stopPropagation={_i}>
	<aside class="grid-flow-col items-center">
		<p>Copyright © PRISMS CS Club {new Date().getFullYear()} - All right reserved</p>
	</aside>
</footer>

{#if _b}
	<div class="special no-select">
		<img class="no-select" src={_f} alt=":)" />
	</div>
{/if}

<style>
	.special {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 1000;
	}

	.special img {
		max-width: 80%;
		max-height: 80%;
	}

	/* Prevent text selection */
	.no-select {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
