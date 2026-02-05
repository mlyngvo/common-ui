import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {storage} from "./local-storage";

interface UseTabsOptions {
    /**
     * Total number of tabs. When provided, prevents setting invalid tab indices.
     * For example, if tabCount is 3, only indices 0, 1, 2 are valid.
     */
    tabCount?: number;
}

/**
 * A hook for managing tab state with URL and local storage persistence.
 *
 * Features:
 * - Syncs tab state with URL query parameter (`?tab=N`)
 * - Persists tab selection to local storage for cross-session persistence
 * - Supports bookmarkable/shareable URLs with specific tabs
 * - Optional bounds validation via `tabCount` option
 *
 * Priority order for the initial tab:
 * 1. URL query parameter (`?tab=N`)
 * 2. Local storage value
 * 3. Default (0)
 *
 * @param key - Unique identifier for storing tab state in local storage
 * @param options - Configuration options
 * @returns Object containing current tab index and changeTab function
 *
 * @example
 * // Basic usage
 * const { tab, changeTab } = useTabs('settings-page');
 *
 * @example
 * // With bounds validation (3 tabs: indices 0, 1, 2)
 * const { tab, changeTab } = useTabs('settings-page', { tabCount: 3 });
 */
export function useTabs(key: string, options: UseTabsOptions = {}) {
    const {tabCount} = options;
    const navigate = useNavigate();

    const [tab, setTab] = useState(0);

    /**
     * Validates that the given index is a valid tab index.
     * Checks that it's a finite non-negative number, and within bounds if tabCount is set.
     */
    const isValidIndex = useCallback((index: number) => {
        if (!Number.isFinite(index) || index < 0) {
            return false;
        }
        if (tabCount !== undefined && index >= tabCount) {
            return false;
        }
        return true;
    }, [tabCount]);

    /**
     * Changes the active tab and updates both URL and local storage.
     *
     * @param index - The tab index to switch to
     * @param replace - If true, replaces current history entry instead of pushing
     */
    const changeTab = useCallback((index: number, replace = false) => {
        if (!isValidIndex(index)) {
            return;
        }

        setTab(index);
        storage.save(key, index);

        // Update URL with a new tab parameter while preserving other query params
        const parameters = new URLSearchParams(window.location.search);
        parameters.set('tab', String(index));
        void navigate(`${window.location.pathname}?${parameters.toString()}`, {replace});
    }, [key, navigate, isValidIndex]);

    useEffect(() => {
        const parameters = new URLSearchParams(window.location.search);
        const tabParameter = Number.parseInt(parameters.get('tab') ?? '', 10);

        // Priority 1: Use URL parameter if valid
        if (isValidIndex(tabParameter)) {
            setTab(tabParameter);
            storage.save(key, tabParameter);
            return;
        }

        // Priority 2: Fall back to stored value if valid
        const stored = storage.get<number>(key);
        if (stored !== undefined && isValidIndex(stored)) {
            changeTab(stored, true);
        }
    }, [key, isValidIndex, changeTab]);

    return {
        tab,
        changeTab
    };
}