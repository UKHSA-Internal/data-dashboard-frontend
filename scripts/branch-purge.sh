#!/bin/bash

# Configuration
remote="origin"
days_threshold=30
protected_branches="main|master|develop|staging|production"

# Get current date in seconds since epoch
current_date=$(date +%s)
threshold_date=$((current_date - days_threshold*24*60*60))

echo "Fetching latest remote information..."
git fetch $remote --prune

echo "Finding stale branches older than $days_threshold days..."
echo "Protected branches pattern: $protected_branches"
echo

# Get all remote branches, excluding protected ones
remote_branches=$(git branch -r --format='%(refname:short)' | grep "^$remote/" | grep -vE "($protected_branches)$")

stale_branches=()
active_branches=()

for branch in $remote_branches; do
    # Extract just the branch name without remote prefix
    branch_name=${branch#$remote/}
    
    # Get last commit date for the remote branch
    last_commit_date=$(git log -1 --format=%at "$branch" 2>/dev/null)
    
    if [ -z "$last_commit_date" ]; then
        echo "Warning: Could not get commit date for $branch, skipping"
        continue
    fi
    
    # Convert to human readable date for display
    readable_date=$(date -d "@$last_commit_date" "+%Y-%m-%d %H:%M")
    
    if [ "$last_commit_date" -lt "$threshold_date" ]; then
        stale_branches+=("$branch_name")
        echo "STALE: $branch (last commit: $readable_date)"
    else
        active_branches+=("$branch_name")
        echo "ACTIVE: $branch (last commit: $readable_date)"
    fi
done

echo
echo "Summary:"
echo "- Active branches: ${#active_branches[@]}"
echo "- Stale branches: ${#stale_branches[@]}"

if [ ${#stale_branches[@]} -eq 0 ]; then
    echo "No stale branches found!"
    exit 0
fi

echo
echo "Stale branches to be deleted:"
for branch in "${stale_branches[@]}"; do
    echo "  - $branch"
done

# Confirmation prompt
echo
read -p "Do you want to delete these ${#stale_branches[@]} stale branches? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

# Delete branches
echo "Deleting stale branches..."
failed_deletions=()

for branch in "${stale_branches[@]}"; do
    echo "Deleting remote branch: $remote/$branch"
    if git push $remote --delete "$branch" --no-verify 2>/dev/null; then
        echo "✓ Successfully deleted $remote/$branch"
    else
        echo "✗ Failed to delete $remote/$branch"
        failed_deletions+=("$branch")
    fi
done

echo
echo "Cleanup complete!"
echo "Successfully deleted: $((${#stale_branches[@]} - ${#failed_deletions[@]})) branches"

if [ ${#failed_deletions[@]} -gt 0 ]; then
    echo "Failed to delete: ${#failed_deletions[@]} branches"
    echo "Failed branches:"
    for branch in "${failed_deletions[@]}"; do
        echo "  - $branch"
    done
fi