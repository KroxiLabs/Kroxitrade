<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { languageStore, translate } from "~lib/services/i18n";
  import { settings, type BookmarkTradeActionId } from "~lib/services/settings";
  import type {
    BookmarksCategoryStruct,
    BookmarksTradeStruct
  } from "~lib/types/bookmarks";
  import { appendIconElement } from "~lib/utilities/icons";
  import SvgIcon from "./SvgIcon.svelte";

  import editIcon from "lucide-static/icons/pencil.svg?raw";
  import replaceIcon from "lucide-static/icons/refresh-cw.svg?raw";
  import copyIcon from "lucide-static/icons/copy.svg?raw";
  import liveIcon from "lucide-static/icons/activity.svg?raw";
  import checkIcon from "lucide-static/icons/check.svg?raw";
  import trashIcon from "lucide-static/icons/trash-2.svg?raw";
  import moreIcon from "lucide-static/icons/more-horizontal.svg?raw";

  interface Props {
    trade: BookmarksTradeStruct;
    onEdit: () => void;
    onReplace: () => void;
    onCopy: () => void;
    onOpenLive: () => void;
    onToggle: () => void;
    onDelete: () => void;
    compactText?: string;
    categoriesEnabled?: boolean;
    categoryOptions?: BookmarksCategoryStruct[];
    selectedCategoryId?: string | null;
    onCategorySelect?: (categoryId: string | null) => void;
    onCategoryCreate?: (title: string) => void | Promise<void>;
  }

  let {
    trade,
    onEdit,
    onReplace,
    onCopy,
    onOpenLive,
    onToggle,
    onDelete,
    compactText = "",
    categoriesEnabled = false,
    categoryOptions = [],
    selectedCategoryId = null,
    onCategorySelect = () => {},
    onCategoryCreate = () => {}
  }: Props = $props();

  type TradeAction = {
    id: BookmarkTradeActionId;
    icon: string;
    label: string;
    handler: () => void;
    danger?: boolean;
  };

  const OPEN_EVENT_NAME = "poe-trade-plus:trade-actions-open";
  const ACTION_ORDER: BookmarkTradeActionId[] = [
    "edit",
    "replace",
    "copy",
    "openLive",
    "toggle",
    "delete"
  ];

  let triggerRef: HTMLButtonElement | null = $state(null);
  let isOpen = $state(false);
  let menuRoot: HTMLDivElement | null = null;

  let actions = $derived([
    {
      id: "edit",
      icon: editIcon,
      label: translate($languageStore, "folder.editSearchName"),
      handler: onEdit
    },
    {
      id: "replace",
      icon: replaceIcon,
      label: translate($languageStore, "folder.replaceCurrentSearch"),
      handler: onReplace
    },
    {
      id: "copy",
      icon: copyIcon,
      label: translate($languageStore, "folder.copyUrl"),
      handler: onCopy
    },
    {
      id: "openLive",
      icon: liveIcon,
      label: translate($languageStore, "folder.openLiveSearch"),
      handler: onOpenLive
    },
    {
      id: "toggle",
      icon: checkIcon,
      label: trade.completedAt
        ? translate($languageStore, "folder.markPending")
        : translate($languageStore, "folder.markComplete"),
      handler: onToggle
    },
    {
      id: "delete",
      icon: trashIcon,
      label: translate($languageStore, "folder.deleteTrade"),
      handler: onDelete,
      danger: true
    }
  ] satisfies TradeAction[]);

  let visibleActionIds = $derived(
    $settings.ultraCompactBookmarks
      ? $settings.ultraCompactBookmarkTradeActions
      : $settings.compactActionsMenu
        ? $settings.compactBookmarkTradeActions
        : $settings.classicBookmarkTradeActions
  );
  let inlineActions = $derived(
    actions.filter((action) => visibleActionIds.includes(action.id))
  );
  let dropdownActions = $derived(actions.filter((action) => !inlineActions.includes(action)));
  let hasCategoryMenu = $derived(categoriesEnabled);
  const stopAndRun = (handler: () => void) => (event: MouseEvent) => {
    event.stopPropagation();
    handler();
  };

  const closeMenu = () => {
    isOpen = false;
    menuRoot?.remove();
    menuRoot = null;
  };

  const positionMenu = () => {
    if (!triggerRef || !menuRoot) return;

    const triggerRect = triggerRef.getBoundingClientRect();
    const menuRect = menuRoot.getBoundingClientRect();
    const gap = 4;
    const margin = 8;

    let left = triggerRect.right - menuRect.width;
    left = Math.max(margin, Math.min(left, window.innerWidth - menuRect.width - margin));

    let top = triggerRect.bottom + gap;
    if (top + menuRect.height > window.innerHeight - margin) {
      top = Math.max(margin, triggerRect.top - menuRect.height - gap);
    }

    menuRoot.style.left = `${Math.round(left)}px`;
    menuRoot.style.top = `${Math.round(top)}px`;
    menuRoot.dataset.ready = "true";
  };

  const positionMenuFrame = () => {
    window.requestAnimationFrame(() => {
      positionMenu();
      window.requestAnimationFrame(() => {
        positionMenu();
      });
    });
  };

  const buildCategoryCreateForm = (root: HTMLDivElement) => {
    const form = document.createElement("form");
    form.className = "trade-action-menu-portal__category-form";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "trade-action-menu-portal__category-input";
    input.placeholder = translate($languageStore, "folder.categoryPrompt");
    input.setAttribute("aria-label", translate($languageStore, "folder.categoryPrompt"));

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "trade-action-menu-portal__category-submit";
    submit.textContent = translate($languageStore, "folder.addCategory");

    form.append(input, submit);
    form.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const title = input.value.trim();
      if (!title) {
        input.focus();
        return;
      }
      closeMenu();
      void onCategoryCreate(title);
    });

    root.querySelector(".trade-action-menu-portal__category.is-new")?.replaceWith(form);
    positionMenuFrame();
    window.requestAnimationFrame(() => {
      input.focus();
    });
  };

  const buildMenu = () => {
    menuRoot?.remove();

    const root = document.createElement("div");
    root.className = "trade-action-menu-portal";
    root.dataset.ready = "false";

    for (const action of dropdownActions) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `trade-action-menu-portal__item${action.danger ? " is-danger" : ""}`;
      const icon = document.createElement("span");
      icon.className = "trade-action-menu-portal__icon";
      icon.setAttribute("aria-hidden", "true");
      appendIconElement(icon, action.icon);
      const label = document.createElement("span");
      label.className = "trade-action-menu-portal__label";
      label.textContent = action.label;
      button.append(icon, label);
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        action.handler();
        closeMenu();
      });
      root.appendChild(button);
    }

    if (hasCategoryMenu) {
      if (dropdownActions.length > 0) {
        const divider = document.createElement("div");
        divider.className = "trade-action-menu-portal__divider";
        root.appendChild(divider);
      }

      const heading = document.createElement("div");
      heading.className = "trade-action-menu-portal__heading";
      heading.textContent = translate($languageStore, "folder.categorySelect");
      root.appendChild(heading);

      const appendCategoryButton = (
        labelText: string,
        selected: boolean,
        handler: () => void,
        extraClass = "",
        closeOnClick = true
      ) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `trade-action-menu-portal__category${selected ? " is-selected" : ""}${extraClass ? ` ${extraClass}` : ""}`;
        const marker = document.createElement("span");
        marker.className = "trade-action-menu-portal__category-marker";
        marker.setAttribute("aria-hidden", "true");
        if (selected) {
          appendIconElement(marker, checkIcon);
        }
        const label = document.createElement("span");
        label.className = "trade-action-menu-portal__label";
        label.textContent = labelText;
        button.append(marker, label);
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          if (closeOnClick) {
            closeMenu();
          }
          handler();
        });
        root.appendChild(button);
      };

      appendCategoryButton(
        translate($languageStore, "folder.noCategory"),
        !selectedCategoryId,
        () => onCategorySelect(null)
      );

      for (const category of categoryOptions) {
        appendCategoryButton(
          category.title,
          selectedCategoryId === category.id,
          () => onCategorySelect(category.id)
        );
      }

      appendCategoryButton(
        translate($languageStore, "folder.newCategoryOption"),
        false,
        () => buildCategoryCreateForm(root),
        "is-new",
        false
      );
    }

    document.body.appendChild(root);
    menuRoot = root;
    positionMenuFrame();
  };

  const toggleMenu = (event: MouseEvent) => {
    event.stopPropagation();

    if (isOpen) {
      closeMenu();
      return;
    }

    document.dispatchEvent(new CustomEvent(OPEN_EVENT_NAME));
    isOpen = true;
    buildMenu();
  };

  const runInlineAction = (handler: () => void) => {
    handler();
    closeMenu();
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as Node | null;
    if (!isOpen) return;
    if (menuRoot?.contains(target) || triggerRef?.contains(target)) return;
    closeMenu();
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeMenu();
      triggerRef?.focus();
    }
  };

  const handleOtherMenuOpen = () => {
    closeMenu();
  };

  const handleViewportChange = () => {
    if (!isOpen) return;
    closeMenu();
  };

  onMount(() => {
    document.addEventListener("click", handleDocumentClick, true);
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener(OPEN_EVENT_NAME, handleOtherMenuOpen);
    window.addEventListener("resize", handleViewportChange);
    document.addEventListener("scroll", handleViewportChange, true);
    document.addEventListener("wheel", handleViewportChange, {
      capture: true,
      passive: true
    });
    document.addEventListener("touchmove", handleViewportChange, {
      capture: true,
      passive: true
    });
  });

  onDestroy(() => {
    closeMenu();
    document.removeEventListener("click", handleDocumentClick, true);
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener(OPEN_EVENT_NAME, handleOtherMenuOpen);
    window.removeEventListener("resize", handleViewportChange);
    document.removeEventListener("scroll", handleViewportChange, true);
    document.removeEventListener("wheel", handleViewportChange, true);
    document.removeEventListener("touchmove", handleViewportChange, true);
  });
</script>

<div class="trade-actions-menu">
  <div class="trade-actions-menu__inline" class:is-compact={$settings.compactActionsMenu}>
    {#if $settings.compactActionsMenu && compactText}
      <span class="trade-actions-menu__text" title={compactText}>{compactText}</span>
    {/if}

    {#each inlineActions as action (action.id)}
      <button
        type="button"
        class="trade-action-btn"
        class:is-danger={action.danger}
        title={action.label}
        aria-label={action.label}
        onclick={stopAndRun(() => runInlineAction(action.handler))}
      >
        <span class="trade-action-btn__icon" aria-hidden="true">
          <SvgIcon svg={action.icon} />
        </span>
      </button>
    {/each}

    {#if dropdownActions.length > 0 || hasCategoryMenu}
      <button
        type="button"
        class="trade-action-btn"
        title={translate($languageStore, "folder.actionsMenu")}
        aria-label={translate($languageStore, "folder.actionsMenu")}
        aria-expanded={isOpen}
        onclick={toggleMenu}
        bind:this={triggerRef}
      >
        <span class="trade-action-btn__icon" aria-hidden="true">
          <SvgIcon svg={moreIcon} />
        </span>
      </button>
    {/if}
  </div>
</div>

<style lang="scss">
  @use "../lib/styles/variables" as *;

  .trade-actions-menu {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .trade-actions-menu__inline {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }

  .trade-actions-menu__inline.is-compact {
    gap: 8px;
  }

  .trade-actions-menu__text {
    min-width: 0;
    font-size: calc(10px * var(--bt-text-scale, 1));
    line-height: 1.2;
    color: rgba($gold-alt, 0.52);
    letter-spacing: 0.03em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .trade-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 1px solid rgba($white, 0.12);
    border-radius: 3px;
    background: rgba($black, 0.45);
    color: rgba($white, 0.82);
    cursor: pointer;
    transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;

    &:hover {
      background-color: rgba($white, 0.08);
      border-color: rgba($gold, 0.38);
      color: $white;
    }

    &.is-danger:hover {
      background-color: rgba($red, 0.18);
      border-color: rgba($red, 0.5);
      color: #ffd7d7;
    }
  }

  .trade-action-btn__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 13px;
    height: 13px;
    flex-shrink: 0;
    font-size: 0;
  }

  :global(.trade-action-menu-portal) {
    position: fixed;
    left: -9999px;
    top: -9999px;
    z-index: 2147483647;
    min-width: 182px;
    padding: 6px;
    border: 1px solid rgba(168, 129, 73, 0.3);
    border-radius: 6px;
    background: #0b0b0b;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    opacity: 0;
    pointer-events: none;
  }

  :global(.trade-action-menu-portal[data-ready="true"]) {
    opacity: 1;
    pointer-events: auto;
  }

  :global(.trade-action-menu-portal__item) {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 12px;
    border: 0;
    border-radius: 4px;
    background: #0b0b0b;
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    text-align: left;
    font-size: calc(12px * var(--bt-text-scale, 1));
    line-height: 1.35;
  }

  :global(.trade-action-menu-portal__item:hover) {
    background: #171717;
  }

  :global(.trade-action-menu-portal__item.is-danger:hover) {
    background-color: rgba(120, 38, 38, 0.32);
    color: #ffd7d7;
  }

  :global(.trade-action-menu-portal__icon) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 13px;
    height: 13px;
    flex-shrink: 0;
    font-size: 0;
  }

  :global(.trade-action-menu-portal__label) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :global(.trade-action-menu-portal__divider) {
    height: 1px;
    margin: 5px 4px;
    background: rgba(168, 129, 73, 0.18);
  }

  :global(.trade-action-menu-portal__heading) {
    padding: 6px 8px 4px;
    color: rgba(224, 176, 102, 0.78);
    font-family: $primary-font;
    font-size: calc(10px * var(--bt-text-scale, 1));
    letter-spacing: 0.08em;
    line-height: 1.2;
    text-transform: uppercase;
  }

  :global(.trade-action-menu-portal__category) {
    display: flex;
    align-items: center;
    gap: 9px;
    width: 100%;
    min-height: 30px;
    padding: 7px 10px;
    border: 1px solid transparent;
    border-radius: 4px;
    background: #0b0b0b;
    color: rgba(255, 255, 255, 0.78);
    cursor: pointer;
    text-align: left;
    font-size: calc(11px * var(--bt-text-scale, 1));
    line-height: 1.3;
  }

  :global(.trade-action-menu-portal__category:hover),
  :global(.trade-action-menu-portal__category.is-selected) {
    border-color: rgba(168, 129, 73, 0.22);
    background: #171717;
    color: rgba(255, 255, 255, 0.94);
  }

  :global(.trade-action-menu-portal__category.is-new) {
    color: rgba(224, 176, 102, 0.86);
  }

  :global(.trade-action-menu-portal__category-marker) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 13px;
    height: 13px;
    flex: 0 0 13px;
    color: rgba(224, 176, 102, 0.9);
    font-size: 0;
  }

  :global(.trade-action-menu-portal__category-marker .action-svg) {
    width: 13px;
    height: 13px;
    min-width: 13px;
    min-height: 13px;
    display: block;
    overflow: visible;
    stroke-width: 1.7;
  }

  :global(.trade-action-menu-portal__category-form) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 6px 8px 8px;
  }

  :global(.trade-action-menu-portal__category-input) {
    width: 100%;
    min-height: 30px;
    padding: 0 8px;
    border: 1px solid rgba(168, 129, 73, 0.3);
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.34);
    color: rgba(255, 255, 255, 0.9);
    font-family: $primary-font;
    font-size: calc(11px * var(--bt-text-scale, 1));
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  :global(.trade-action-menu-portal__category-input:focus) {
    border-color: rgba(224, 176, 102, 0.62);
    box-shadow: 0 0 0 2px rgba(168, 129, 73, 0.12);
    outline: none;
  }

  :global(.trade-action-menu-portal__category-submit) {
    min-height: 28px;
    border: 1px solid rgba(168, 129, 73, 0.34);
    border-radius: 4px;
    background: rgba(168, 129, 73, 0.08);
    color: rgba(224, 176, 102, 0.94);
    font-family: $primary-font;
    font-size: calc(10px * var(--bt-text-scale, 1));
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
  }

  :global(.trade-action-menu-portal__category-submit:hover),
  :global(.trade-action-menu-portal__category-submit:focus-visible) {
    border-color: rgba(224, 176, 102, 0.62);
    background: rgba(168, 129, 73, 0.16);
    color: #fff;
    outline: none;
  }
</style>
