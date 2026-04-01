<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { languageStore, translate } from "~lib/services/i18n";
  import type { BookmarksTradeStruct } from "~lib/types/bookmarks";

  import editIcon from "data-text:lucide-static/icons/pencil.svg";
  import replaceIcon from "data-text:lucide-static/icons/refresh-cw.svg";
  import copyIcon from "data-text:lucide-static/icons/copy.svg";
  import checkIcon from "data-text:lucide-static/icons/check.svg";
  import trashIcon from "data-text:lucide-static/icons/trash-2.svg";
  import moreIcon from "data-text:lucide-static/icons/more-horizontal.svg";

  export let trade: BookmarksTradeStruct;
  export let onEdit: () => void;
  export let onReplace: () => void;
  export let onCopy: () => void;
  export let onToggle: () => void;
  export let onDelete: () => void;

  let triggerRef: HTMLButtonElement;
  let menuRef: HTMLDivElement;
  let isOpen = false;

  type ActionId = "edit" | "replace" | "copy" | "toggle" | "delete";

  type Action = {
    id: ActionId;
    icon: string;
    labelKey: string;
    handler: () => void;
    danger?: boolean;
    isToggle?: boolean;
  };

  const normalizeIcon = (svg: string) =>
    svg.replace(/<svg\b([^>]*)>/, (_match, attrs) => {
      const cleaned = attrs
        .replace(/\sclass="[^"]*"/g, "")
        .replace(/\swidth="[^"]*"/g, "")
        .replace(/\sheight="[^"]*"/g, "")
        .replace(/\sviewBox="[^"]*"/g, "")
        .trim();
      return `<svg ${cleaned} viewBox="-2 -2 28 28" class="action-svg">`;
    });

  const icons = {
    edit: normalizeIcon(editIcon),
    replace: normalizeIcon(replaceIcon),
    copy: normalizeIcon(copyIcon),
    toggle: normalizeIcon(checkIcon),
    delete: normalizeIcon(trashIcon),
    more: normalizeIcon(moreIcon)
  };

  const actions: Action[] = [
    { id: "edit", icon: icons.edit, labelKey: "editSearchName", handler: onEdit },
    { id: "replace", icon: icons.replace, labelKey: "replaceCurrentSearch", handler: onReplace },
    { id: "copy", icon: icons.copy, labelKey: "copyUrl", handler: onCopy },
    { id: "toggle", icon: icons.toggle, labelKey: "markComplete", handler: onToggle, isToggle: true },
    { id: "delete", icon: icons.delete, labelKey: "deleteTrade", handler: onDelete, danger: true }
  ];

  const getLabel = (action: Action) => {
    const key = `folder.${action.labelKey}`;
    if (action.isToggle) {
      return trade.completedAt
        ? translate($languageStore, "folder.markPending")
        : translate($languageStore, "folder.markComplete");
    }
    return translate($languageStore, key);
  };

  const isActive = (action: Action) => action.isToggle && !!trade.completedAt;

  const closeMenu = () => (isOpen = false);
  const toggleMenu = () => (isOpen = !isOpen);

  const handleAction = (handler: () => void) => {
    handler();
    closeMenu();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      e.target instanceof Node &&
      menuRef &&
      !menuRef.contains(e.target) &&
      !triggerRef.contains(e.target)
    ) {
      closeMenu();
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      closeMenu();
      triggerRef?.focus();
    }
  };

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("keydown", handleKeydown);
  });
</script>

<div class="actions-container">
  <div class="actions-inline">
    {#each actions as action}
      <button
        type="button"
        class="btn btn--icon"
        class:btn--active={isActive(action)}
        class:btn--danger={action.danger}
        title={getLabel(action)}
        aria-label={getLabel(action)}
        on:click|stopPropagation={action.handler}
      >
        <span class="btn__icon">{@html action.icon}</span>
      </button>
    {/each}
  </div>

  <button
    type="button"
    class="btn btn--icon menu-trigger"
    title={translate($languageStore, "folder.actionsMenu")}
    aria-label={translate($languageStore, "folder.actionsMenu")}
    aria-expanded={isOpen}
    on:click|stopPropagation={toggleMenu}
    bind:this={triggerRef}
  >
    <span class="btn__icon">{@html icons.more}</span>
  </button>

  {#if isOpen}
    <div class="menu-dropdown" role="menu" bind:this={menuRef}>
      {#each actions as action}
        <button
          type="button"
          class="btn btn--menu"
          class:btn--active={isActive(action)}
          class:btn--danger={action.danger}
          role="menuitem"
          on:click|stopPropagation={() => handleAction(action.handler)}
        >
          <span class="btn__icon">{@html action.icon}</span>
          <span class="btn__label">{getLabel(action)}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  @use "../lib/styles/variables" as *;

  .actions-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .actions-inline {
    display: flex;
    align-items: center;
    gap: 4px;
    padding-left: 8px;
    border-left: 1px solid rgba($white, 0.05);
  }

  .btn.menu-trigger {
    display: none;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid rgba($white, 0.12);
    background-color: rgba($black, 0.45);
    color: rgba($white, 0.82);
    cursor: pointer;
    transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;

    &:hover {
      background-color: rgba($white, 0.08);
      border-color: rgba($gold, 0.38);
      color: $white;
    }

    &--active {
      background-color: rgba($green, 0.18);
      border-color: rgba($green, 0.5);
      color: #d7ffd7;
    }

    &--danger:hover {
      background-color: rgba($red, 0.18);
      border-color: rgba($red, 0.5);
      color: #ffd7d7;
    }

    &--icon {
      width: 24px;
      height: 24px;
      font-size: 12px;
      line-height: 1;
    }

    &--menu {
      justify-content: flex-start;
      width: 100%;
      gap: 10px;
      padding: 8px 10px;
      border: none;
      background: none;
      border-radius: 4px;
      text-align: left;
      font-size: 12px;

      &:hover {
        background-color: rgba($white, 0.08);
        border-color: transparent;
      }
    }
  }

  .btn__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 13px;
    height: 13px;
    flex-shrink: 0;
    font-size: 0;
  }

  .btn__icon :global(.action-svg) {
    width: 13px;
    height: 13px;
    min-width: 13px;
    min-height: 13px;
    display: block;
    overflow: visible;
    stroke-width: 1.7;
  }

  .btn__label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .menu-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-90%);
    z-index: 1000;
    min-width: 160px;
    margin-top: 4px;
    background: rgba($black, 0.96);
    border: 1px solid rgba($gold, 0.3);
    border-radius: 6px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    padding: 4px;
    display: flex;
    flex-direction: column;
  }

  @container (max-width: 359px) {
    .actions-inline {
      display: none;
    }

    .btn.menu-trigger {
      display: inline-flex;
    }
  }
</style>
