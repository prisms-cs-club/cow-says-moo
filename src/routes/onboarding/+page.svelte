<script lang="ts">
	import { goto } from '$app/navigation';

	let { data } = $props();

	let name: string = $state(data.defaultName);
	let house: string = $state('');
	let submitting: boolean = $state(false);
	let error: string = $state('');

	const houses = [
		{ value: 'albemarle', label: 'Albemarle', color: 'bg-yellow-500' },
		{ value: 'ettl', label: 'Ettl', color: 'bg-green-500' },
		{ value: 'hobler', label: 'Hobler', color: 'bg-red-500' },
		{ value: 'lambert', label: 'Lambert', color: 'bg-blue-500' }
	];

	async function handleSubmit(event: Event) {
		event.preventDefault();
		error = '';

		if (!name.trim()) {
			error = 'Please enter your name';
			return;
		}

		if (!house) {
			error = 'Please select your house';
			return;
		}

		submitting = true;

		try {
			const response = await fetch('/api/onboarding', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: name.trim(),
					house
				})
			});

			if (!response.ok) {
				throw new Error('Failed to complete onboarding');
			}

			// Redirect to home page
			await goto('/');
		} catch (err) {
			error = 'An error occurred. Please try again.';
			console.error(err);
			submitting = false;
		}
	}
</script>

<div class="onboarding-container">
	<div class="onboarding-card">
		<div class="mb-8 text-center">
			<h1 class="mb-2 text-4xl font-bold">Welcome to PRISMS House System!</h1>
			<p class="text-lg text-gray-600">Let's get you set up</p>
		</div>

		<form onsubmit={handleSubmit} class="space-y-6">
			<!-- Name Input -->
			<div class="form-control">
				<label class="label" for="name">
					<span class="label-text text-lg font-semibold">What name would you like to use?</span>
				</label>
				<input
					id="name"
					type="text"
					bind:value={name}
					placeholder="Enter your preferred name"
					class="input input-lg input-bordered"
					required
					disabled={submitting}
				/>
				<div class="label">
					<span class="label-text-alt">This is how you'll appear on the leaderboards</span>
				</div>
			</div>

			<!-- House Selection -->
			<div class="form-control">
				<div class="label">
					<span class="label-text text-lg font-semibold">Select your house</span>
				</div>
				<div class="mt-2 grid grid-cols-2 gap-4">
					{#each houses as houseOption}
						<label class="house-option cursor-pointer" class:selected={house === houseOption.value}>
							<input
								type="radio"
								name="house"
								value={houseOption.value}
								bind:group={house}
								class="radio-primary radio"
								disabled={submitting}
							/>
							<div class="house-card {houseOption.color}">
								<img
									src="/image/house-logo/{houseOption.value}/letter.png"
									alt={houseOption.label}
									class="house-logo"
								/>
								<span class="house-name">{houseOption.label}</span>
							</div>
						</label>
					{/each}
				</div>
			</div>

			{#if error}
				<div class="alert alert-error">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{error}</span>
				</div>
			{/if}

			<button type="submit" class="btn btn-primary btn-lg w-full" disabled={submitting}>
				{#if submitting}
					<span class="loading loading-spinner"></span>
					Completing Setup...
				{:else}
					Complete Setup
				{/if}
			</button>
		</form>
	</div>
</div>

<style>
	.onboarding-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.onboarding-card {
		background: white;
		border-radius: 1rem;
		padding: 3rem;
		max-width: 600px;
		width: 100%;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}

	.house-option {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.house-option input[type='radio'] {
		position: absolute;
		opacity: 0;
	}

	.house-card {
		flex: 1;
		padding: 1.5rem;
		border-radius: 0.5rem;
		text-align: center;
		transition: all 0.3s ease;
		border: 3px solid transparent;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.house-option:hover .house-card {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}

	.house-option.selected .house-card {
		border-color: oklch(var(--p));
		transform: scale(1.05);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.house-logo {
		width: 80px;
		height: 80px;
		object-fit: contain;
	}

	.house-name {
		font-size: 1.25rem;
		font-weight: bold;
		color: white;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
	}

	@media (max-width: 640px) {
		.onboarding-card {
			padding: 2rem 1.5rem;
		}

		.house-logo {
			width: 60px;
			height: 60px;
		}

		.house-name {
			font-size: 1rem;
		}
	}
</style>
