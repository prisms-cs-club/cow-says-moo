<script lang="ts">
	import { getAllMembers, getMembersByHouse } from '$lib/firebase';
	import type { Member } from '$lib/format';

	let { data } = $props();

	let members: NonNullable<Member>[] = $state([]);
	let filteredMembers: NonNullable<Member>[] = $state([]);
	let selectedHouse: string = $state('all');
	let searchQuery: string = $state('');
	let loading: boolean = $state(true);

	const houses = ['all', 'albemarle', 'ettl', 'hobler', 'lambert'];

	$effect.pre(() => {
		(async () => {
			loading = true;
			try {
				members = await getAllMembers();
				filteredMembers = members;
				loading = false;
			} catch (error) {
				console.error('Error loading members:', error);
				loading = false;
			}
		})();
	});

	$effect(() => {
		let filtered = members;

		// Filter by house
		if (selectedHouse !== 'all') {
			filtered = filtered.filter((m) => m.house.toLowerCase() === selectedHouse.toLowerCase());
		}

		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(m) =>
					m.name.toLowerCase().includes(query) ||
					m.email.toLowerCase().includes(query) ||
					m.house.toLowerCase().includes(query)
			);
		}

		filteredMembers = filtered;
	});

	function getRoleColor(role: string): string {
		switch (role) {
			case 'admin':
				return 'badge-error';
			case 'teacher':
				return 'badge-warning';
			default:
				return 'badge-info';
		}
	}

	function getHouseColor(house: string): string {
		const houseLower = house.toLowerCase();
		switch (houseLower) {
			case 'albemarle':
				return 'bg-yellow-100 text-yellow-800';
			case 'ettl':
				return 'bg-green-100 text-green-800';
			case 'hobler':
				return 'bg-red-100 text-red-800';
			case 'lambert':
				return 'bg-blue-100 text-blue-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}
</script>

<div class="admin-container">
	<h1 class="mb-6 text-4xl font-bold">Admin Panel</h1>

	<div class="stats mb-8 shadow">
		<div class="stat">
			<div class="stat-title">Total Members</div>
			<div class="stat-value">{members.length}</div>
		</div>
		<div class="stat">
			<div class="stat-title">Filtered Results</div>
			<div class="stat-value">{filteredMembers.length}</div>
		</div>
		<div class="stat">
			<div class="stat-title">Selected House</div>
			<div class="stat-value text-2xl capitalize">{selectedHouse}</div>
		</div>
	</div>

	<div class="filters-container mb-6">
		<div class="flex flex-col gap-4 md:flex-row">
			<!-- Search Input -->
			<div class="form-control flex-1">
				<label class="label" for="search">
					<span class="label-text">Search by name or email</span>
				</label>
				<input
					id="search"
					type="text"
					bind:value={searchQuery}
					placeholder="Search members..."
					class="input input-bordered w-full"
				/>
			</div>

			<!-- House Filter -->
			<div class="form-control">
				<label class="label" for="house-filter">
					<span class="label-text">Filter by House</span>
				</label>
				<select id="house-filter" bind:value={selectedHouse} class="select select-bordered">
					{#each houses as house}
						<option value={house}>{house.charAt(0).toUpperCase() + house.slice(1)}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	{#if loading}
		<div class="flex items-center justify-center py-20">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="table table-zebra w-full">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>House</th>
						<th>Role</th>
						<th>Events Won</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredMembers as member}
						<tr>
							<td class="font-semibold">{member.name}</td>
							<td>{member.email}</td>
							<td>
								<span class="badge {getHouseColor(member.house)} capitalize">
									{member.house}
								</span>
							</td>
							<td>
								<span class="badge {getRoleColor(member.role)} capitalize">
									{member.role}
								</span>
							</td>
							<td>{member.eventsWon?.length || 0}</td>
						</tr>
					{/each}
				</tbody>
			</table>

			{#if filteredMembers.length === 0}
				<div class="py-10 text-center">
					<p class="text-lg text-gray-500">No members found matching your criteria.</p>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.admin-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
	}

	.filters-container {
		background-color: oklch(var(--b2));
		padding: 1.5rem;
		border-radius: var(--rounded-box, 1rem);
	}

	:global(.badge) {
		font-weight: 600;
	}
</style>
