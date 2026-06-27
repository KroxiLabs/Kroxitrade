import type { TranslationValue } from "./types"

export const spanishTranslations: Record<string, TranslationValue> = {
    "app.name": "Poe Trade Plus",
    "header.subtitle": "Compañero de Trade",
    "header.expandSidebar": "Expandir panel",
    "header.minimizeSidebar": "Minimizar panel",
    "layout.nav.bookmarks": "Favoritos",
    "layout.nav.bulk": "Bulk",
    "layout.nav.history": "Historial",
    "layout.nav.settings": "Ajustes",
    "layout.nav.experimental": "Experimental",
    "layout.nav.about": "Acerca de",
    "layout.removeAlert": "Quitar alerta",
    "layout.resizeSidebar": "Redimensionar panel",
    "layout.restorePanel": "Restaurar panel de Poe Trade Plus",
    "layout.versionNoticeEyebrow": "Nueva versión",
    "layout.versionNoticeMessage": ({ version }) =>
      `Poe Trade Plus se actualizó a la versión ${version}.`,
    "layout.versionNoticeOpen": "Novedades",
    "layout.versionNoticeClose": "Cerrar aviso de nueva versión",
    "whatsNew.eyebrow": "Notas de versión",
    "whatsNew.title": ({ version }) => `Novedades de ${version}`,
    "whatsNew.intro":
      "Un repaso rápido de las mejoras incluidas en esta versión.",
    "whatsNew.releaseBadge": "Generado desde cambios recientes",
    "whatsNew.close": "Cerrar novedades",
    "whatsNew.dismiss": "Entendido",
    "whatsNew.section.bookmarks": "Favoritos",
    "whatsNew.section.features": "Nuevas funciones",
    "whatsNew.section.fixes": "Correcciones",
    "whatsNew.section.tradeTools": "Herramientas de trade",
    "whatsNew.section.polish": "Ajustes",
    "whatsNew.item.versionFolders":
      "Los favoritos quedan separados por versión de Path of Exile Trade.",
    "whatsNew.item.compactActions":
      "Las búsquedas guardadas pueden usar acciones compactas con menú más limpio.",
    "whatsNew.item.backupRestore":
      "El respaldo y restauración de carpetas facilita mover configuraciones entre navegadores.",
    "whatsNew.item.bulkSellers":
      "Bulk Sellers agrupa vendedores repetidos de la lista de resultados actual.",
    "whatsNew.item.equivalentPricing":
      "Precio equivalente muestra conversiones a chaos y divine usando ratios de poe.ninja.",
    "whatsNew.item.finerFilters":
      "Agregar a filtros ayuda a pasar modificadores del objeto a los filtros de trade.",
    "whatsNew.item.onboarding":
      "El tutorial guiado señala las acciones y ajustes principales.",
    "whatsNew.item.resizableSidebar":
      "El panel se puede redimensionar y fijar a cualquiera de los lados del sitio de trade.",
    "whatsNew.item.languages":
      "La interfaz incluye cobertura de más idiomas.",
    "welcome.title": "Bienvenido a Poe Trade Plus",
    "welcome.message":
      "Elegí el idioma que querés usar para la extensión antes de empezar.",
    "welcome.languageLabel": "Idioma de la interfaz",
    "welcome.continue": "Continuar",
    "onboarding.badge": "Recorrido rápido",
    "onboarding.title": "Bienvenido a Poe Trade Plus",
    "onboarding.subtitle":
      "Seguí estos pasos en orden y la guía te va a señalar exactamente dónde hacer clic.",
    "onboarding.stepCounter": ({ current, total }) => `Paso ${current} de ${total}`,
    "onboarding.step1Eyebrow": "Favoritos",
    "onboarding.step1Title": "Creá tu primera carpeta",
    "onboarding.step1Body":
      "Empezá por acá. Este botón crea la carpeta donde vas a guardar tus búsquedas.",
    "onboarding.step1Highlight1":
      "Quedate en la pestaña Favoritos.",
    "onboarding.step1Highlight2":
      "Hacé clic en Nueva carpeta una vez para crear una categoría.",
    "onboarding.step1Highlight3":
      "La carpeta nueva va a aparecer debajo de esta barra.",
    "onboarding.step2Eyebrow": "Favoritos",
    "onboarding.step2Title": "Guardá la búsqueda actual dentro de esa carpeta",
    "onboarding.step2Body":
      "Esta acción convierte la búsqueda de trade que estás viendo ahora en un bookmark guardado.",
    "onboarding.step2Highlight1":
      "Abrí la carpeta que quieras usar si está cerrada.",
    "onboarding.step2Highlight2":
      "Andá a la parte de abajo dentro de esa carpeta.",
    "onboarding.step2Highlight3":
      "Hacé clic en Guardar búsqueda actual mientras estás parado en la búsqueda que querés conservar.",
    "onboarding.step3Eyebrow": "Historial",
    "onboarding.step3Title": "Encontrá tus búsquedas recientes",
    "onboarding.step3Body":
      "Esta pestaña sirve para volver rápido a búsquedas que abriste hace poco, aunque no las hayas guardado.",
    "onboarding.step3Highlight1":
      "Hacé clic en la pestaña Historial de la navegación superior.",
    "onboarding.step3Highlight2":
      "Usala para reabrir búsquedas recientes sin armarlas de nuevo.",
    "onboarding.step3Highlight3":
      "Si querés conservar una para siempre, después guardala desde Favoritos.",
    "onboarding.step4Eyebrow": "Ajustes",
    "onboarding.step4Title": "Volvé a abrir la guía desde acá",
    "onboarding.step4Body":
      "Este primer bloque de ajustes es sólo para el tutorial.",
    "onboarding.step4Highlight1":
      "Usá Abrir tutorial cuando quieras volver a recorrer esta guía.",
    "onboarding.step4Highlight2":
      "Sirve después de cambios o cuando querés repasar una función.",
    "onboarding.step4Highlight3":
      "En los siguientes pasos te voy marcando el resto de los ajustes uno por uno.",
    "onboarding.step5Eyebrow": "Ajustes",
    "onboarding.step5Title": "Posición del panel",
    "onboarding.step5Body":
      "Estos controles cambian en qué lado de la pantalla vive la extensión y con qué ancho arranca.",
    "onboarding.step5Highlight1":
      "Izquierda mueve el panel al lado izquierdo del sitio de trade.",
    "onboarding.step5Highlight2":
      "Derecha lo mueve al lado derecho.",
    "onboarding.step5Highlight3":
      "Restablecer ancho vuelve al ancho por defecto si lo redimensionaste.",
    "onboarding.step6Eyebrow": "Ajustes",
    "onboarding.step6Title": "Idioma",
    "onboarding.step6Body":
      "Esta sección cambia el idioma usado por la interfaz de la extensión.",
    "onboarding.step6Highlight1":
      "Abrí el selector para ver todos los idiomas disponibles.",
    "onboarding.step6Highlight2":
      "La bandera y las etiquetas muestran la opción actual.",
    "onboarding.step6Highlight3":
      "Al cambiarlo, se actualizan los textos de toda la extensión.",
    "onboarding.step7Eyebrow": "Ajustes",
    "onboarding.step7Title": "Precio equivalente",
    "onboarding.step7Body":
      "Este toggle controla la línea extra que convierte precios listados a equivalentes en chaos o divine.",
    "onboarding.step7Highlight1":
      "Activarlo te da ayuda rápida de conversión en los resultados.",
    "onboarding.step7Highlight2":
      "Desactivarlo deja la lista de trade más limpia.",
    "onboarding.step7Highlight3":
      "Sólo cambia cómo se muestran los precios, no la búsqueda en sí.",
    "onboarding.step8Eyebrow": "Ajustes",
    "onboarding.step8Title": "Bulk Sellers",
    "onboarding.step8Body":
      "Este toggle muestra u oculta la pestaña Bulk.",
    "onboarding.step8Highlight1":
      "Activala si querés ver vendedores repetidos agrupados en los resultados actuales.",
    "onboarding.step8Highlight2":
      "Desactivala si casi no usás la ayuda Bulk.",
    "onboarding.step8Highlight3":
      "Cuando está oculta, la pestaña Bulk desaparece de la navegación superior.",
    "onboarding.step9Eyebrow": "Ajustes",
    "onboarding.step9Title": "Historial",
    "onboarding.step9Body":
      "Este toggle muestra u oculta la pestaña Historial.",
    "onboarding.step9Highlight1":
      "Activala si querés acceso rápido a búsquedas recientes.",
    "onboarding.step9Highlight2":
      "Desactivala si sólo usás bookmarks guardados.",
    "onboarding.step9Highlight3":
      "Cuando está oculta, la pestaña Historial sale de la navegación.",
    "onboarding.step10Eyebrow": "Ajustes",
    "onboarding.step10Title": "Agregar a filtros",
    "onboarding.step10Body":
      "Este toggle controla el panel auxiliar que agrega modificadores encontrados directo a los filtros de búsqueda.",
    "onboarding.step10Highlight1":
      "Activarlo deja visible la ayuda Agregar a filtros.",
    "onboarding.step10Highlight2":
      "Desactivarlo simplifica un poco más la barra lateral.",
    "onboarding.step10Highlight3":
      "Afecta el panel auxiliar que aparece al fondo de la extensión.",
    "onboarding.step11Eyebrow": "Ajustes",
    "onboarding.step11Title": "Diseño de Favoritos",
    "onboarding.step11Body":
      "Estos controles cambian cómo se muestran las búsquedas guardadas y sus botones de acción.",
    "onboarding.step11Highlight1":
      "Clásico mantiene la vista más completa de bookmarks.",
    "onboarding.step11Highlight2":
      "Compacto acomoda las acciones en un diseño más apretado con menú de tres puntos.",
    "onboarding.step11Highlight3":
      "Si activás Compacto, las opciones de abajo deciden qué acciones quedan visibles.",
    "onboarding.sampleFolder": "Carpeta del tutorial",
    "onboarding.sampleTrade": "Favorito de ejemplo",
    "onboarding.back": "Atrás",
    "onboarding.next": "Siguiente",
    "onboarding.skip": "Omitir",
    "onboarding.finish": "Empezar a usarlo",
    "popup.description":
      "Poe Trade Plus agrega navegación más rápida y ayudas de trade al sitio oficial de Path of Exile.",
    "popup.trade1": "Trade PoE 1",
    "popup.trade2": "Trade PoE 2",
    "popup.trade1Alt": "Trade de Path of Exile",
    "popup.trade2Alt": "Trade de Path of Exile 2",
    "settings.sidebarTitle": "Posición del panel",
    "settings.sidebarDescription":
      "Elegí en qué lado de la pantalla querés que aparezca el panel de Poe Trade Plus.",
    "settings.left": "Izquierda",
    "settings.right": "Derecha",
    "settings.resetWidth": "Restablecer ancho",
    "settings.languageTitle": "Idioma",
    "settings.languageDescription":
      "Elegí el idioma usado por la interfaz de la extensión.",
    "settings.languageEnglish": "Inglés",
    "settings.languageSpanish": "Español",
    "settings.onboardingTitle": "Tutorial",
    "settings.onboardingDescription":
      "Volvé a abrir la guía rápida para repasar las acciones y pestañas principales.",
    "settings.reopenTutorial": "Abrir tutorial",
    "settings.resultsTitle": "Herramientas de resultados",
    "settings.equivalentTitle": "Precio equivalente",
    "settings.equivalentDescription":
      "Mostrá u ocultá la línea extra con equivalencias en chaos/divine en los resultados.",
    "settings.equivalentSource":
      "Usa ratios de poe.ninja cacheados cada 15 minutos.",
    "settings.equivalentRefresh": "Recargar ratio",
    "settings.equivalentRefreshLoading": "Recargando...",
    "settings.equivalentRefreshSuccess": ({ league }) =>
      `Los ratios de precio equivalente se recargaron para ${league}.`,
    "settings.equivalentRefreshError":
      "No se pudo recargar el ratio de poe.ninja ahora mismo.",
    "settings.equivalentRefreshUnavailable":
      "Abrí primero una liga de trade para recargar el ratio de poe.ninja.",
    "settings.bulkTitle": "Bulk Sellers",
    "settings.bulkDescription":
      "Mostrá u ocultá la pestaña Bulk que agrupa vendedores repetidos de los resultados actuales.",
    "settings.historyTitle": "Historial",
    "settings.historyDescription":
      "Mostrá u ocultá la pestaña Historial que guarda tus búsquedas abiertas recientemente.",
    "settings.finerFiltersTitle": "Agregar a filtros",
    "settings.finerFiltersDescription":
      "Mostrá u ocultá el panel Agregar a filtros al final de la barra lateral.",
    "experimental.eyebrow": "Solo dev",
    "experimental.title": "Experimental",
    "experimental.description":
      "Espacio temporal para probar ideas antes de que lleguen a la interfaz principal.",
    "experimental.devOnlyTitle": "Solo en build de desarrollo",
    "experimental.devOnlyBody":
      "La personalización estable de resultados pasó a Ajustes. Este espacio aparece en builds de desarrollo para futuras flags ocultas y pruebas temporales.",
    "experimental.emptyTitle": "Sin experimentos activos",
    "experimental.emptyBody":
      "Las opciones de acciones de resultado, Copy de PoE2 y Craft of Exile ahora viven en Ajustes, dentro de Resultados.",
    "experimental.resultActionsTitle": "Mostrar siempre acciones del resultado",
    "experimental.resultActionsBody":
      "Mantiene visibles Actualizar, Copiar objeto y Filtrar por estadísticas sin hacer hover.",
    "experimental.poe2CopyTitle": "Habilitar botón Copy de PoE2",
    "experimental.poe2CopyBody":
      "Muestra el botón Copy nativo de PoE2 y copia el objeto para Path of Building. Usa el mismo comportamiento hover que Refresh y Filter by Item Stats.",
    "experimental.poe2CoeTitle": "Habilitar botón Craft of Exile",
    "experimental.poe2CoeBody":
      "Agrega un botón CoE a los resultados de PoE1 y PoE2 que copia el objeto en el formato avanzado de importación.",
    "settings.hidden": "Oculto",
    "settings.visible": "Visible",
    "settings.on": "On",
    "settings.off": "Off",
    "settings.compactActionsTitle": "Diseño de Favoritos",
    "settings.compactActionsDescription":
      "Elegí un diseño más compacto para las búsquedas guardadas, con el nombre de la liga y todas las acciones agrupadas dentro de un menú de tres puntos.",
    "settings.compactActionsDefault": "Clasico",
    "settings.compactActionsCompact": "Compacto",
    "settings.compactTradeActionsTitle": "Acciones visibles fuera del menú",
    "settings.compactTradeActionsDescription":
      "Elegí qué acciones de cada búsqueda guardada quedan visibles en modo compacto. Si no seleccionás ninguna, solo se ven los tres puntos. Si seleccionás todas o todas menos una, se muestran todas.",
    "settings.tradeActionsTitle": "Acciones visibles de cada búsqueda",
    "settings.tradeActionsDescription":
      "Elegí qué acciones de cada búsqueda guardada quedan visibles fuera del menú tanto en el diseño clásico como en el compacto. Si no seleccionás ninguna, solo se ven los tres puntos.",
    "settings.compactTradeActionToggle": "Completar / Pendiente",
    "settings.bookmarkPreviewTitle": "Vista en vivo",
    "settings.bookmarkPreviewDescription":
      "Mirá cómo se va a ver una búsqueda guardada con el diseño actual de favoritos.",
    "settings.bookmarkPreviewFolder": "Equipo favorito",
    "settings.bookmarkPreviewTrade": "Botas con resistencias altas",
    "settings.saveFailed": "No se pudieron guardar los ajustes. Probá de nuevo.",
    "settings.tabs.label": "Categorías de ajustes",
    "settings.tabs.interface": "Interfaz",
    "settings.tabs.sidebar": "Panel",
    "settings.tabs.results": "Resultados",
    "settings.tabs.bookmarks": "Favoritos",
    "settings.sidebarModulesTitle": "Módulos del panel",
    "settings.sidebarModulesDescription":
      "Elegí qué pestañas extra y paneles auxiliares aparecen en la sidebar.",
    "settings.resultActionsTitle": "Mostrar siempre acciones del resultado",
    "settings.resultActionsBody":
      "Mantiene visibles Actualizar, Copiar objeto y Filtrar por estadísticas sin hacer hover.",
    "settings.poe2CopyTitle": "Botón Copy de PoE2",
    "settings.poe2CopyBody":
      "Muestra el botón Copy nativo de PoE2 y copia el objeto para Path of Building.",
    "settings.coeTitle": "Botón Craft of Exile",
    "settings.coeBody":
      "Agrega un botón CoE a resultados de PoE1 y PoE2 que copia el objeto en formato avanzado de Craft of Exile.",
    "about.eyebrow": "Acerca de",
    "about.description":
      "Poe Trade Plus es un complemento para Path of Exile Trade creado para guardar búsquedas, organizar carpetas, seguir el historial y hacer que los flujos de trade repetidos sean rápidos, visuales y fáciles de manejar dentro del sitio oficial.",
    "about.github": "GitHub",
    "about.patreon": "Patreon",
    "about.whatsNewTitle": "Novedades",
    "about.whatsNewDescription":
      "Revisá las notas de la última versión cuando quieras.",
    "about.whatsNewButton": "Abrir novedades",
    "about.version": ({ version }) =>
      `Versión ${version} • Desarrollado por KroxiLabs`,
    "bulk.empty":
      "Todavía no se detectaron vendedores bulk. Abrí una lista de resultados donde el mismo vendedor aparezca más de una vez.",
    "bulk.price": "Precio:",
    "bulk.find": "Buscar",
    "bulk.buy": "Comprar",
    "bulk.findError":
      "No se pudo ubicar esa publicación en los resultados actuales.",
    "bulk.buyError":
      "No se pudo ejecutar la acción de compra para esa publicación.",
    "bulk.visited": "VISITADO",
    "bulk.emptyTitle": "Todavía no hay vendedores repetidos",
    "bulk.refresh": "Actualizar resultados",
    "bulk.listingFallback": ({ index }) => `Listado ${index}`,
    "bulk.priceUnavailable": "Precio no disponible",
    "search.tradeFallback": "Trade",
    "bookmarks.newFolder": "Nueva carpeta",
    "bookmarks.folderCreated": "¡Carpeta creada!",
    "bookmarks.folderDeleted": "¡Carpeta eliminada!",
    "bookmarks.exported": "¡Respaldo exportado!",
    "bookmarks.restored": "¡Respaldo restaurado!",
    "bookmarks.restoreFailed": "No se pudo restaurar el respaldo.",
    "bookmarks.pasteFolderData": "Primero pegá los datos de la carpeta.",
    "bookmarks.invalidFolderData": "Los datos de la carpeta no son válidos.",
    "bookmarks.importedFolder": ({ title }) => `¡"${title}" importada!`,
    "bookmarks.toolbar.new": "Nueva",
    "bookmarks.toolbar.newFolderTitle": "Nueva carpeta",
    "bookmarks.toolbar.cancel": "Cancelar",
    "bookmarks.toolbar.import": "Importar",
    "bookmarks.toolbar.cancelImport": "Cancelar importación",
    "bookmarks.toolbar.importFolder": "Importar carpeta",
    "bookmarks.toolbar.collapse": "Colapsar",
    "bookmarks.toolbar.collapseAll": "Colapsar todo",
    "bookmarks.toolbar.active": "Activas",
    "bookmarks.toolbar.archive": "Archivo",
    "bookmarks.toolbar.showActive": "Mostrar activas",
    "bookmarks.toolbar.showArchived": "Mostrar archivadas",
    "bookmarks.importTitle": "Importar carpeta",
    "bookmarks.importDescription":
      "Pegá abajo el texto exportado de una carpeta para restaurarla como favoritos guardados.",
    "bookmarks.importPlaceholder": "Pegá acá el texto de la carpeta...",
    "bookmarks.importHint":
      "Usá la cadena completa que se exportó previamente desde una carpeta.",
    "bookmarks.emptyEyebrow": "Favoritos",
    "bookmarks.emptyTitle": "Creá tu primera carpeta",
    "bookmarks.emptyDescription":
      "Guardá tus búsquedas de trade más usadas en carpetas para reabrirlas rápido cuando las necesites.",
    "bookmarks.emptyArchivedTitle": "Todavía no hay carpetas archivadas",
    "bookmarks.emptyArchivedDescription":
      "Las carpetas archivadas van a aparecer acá cuando las saques de tu lista activa de favoritos.",
    "bookmarks.emptyArchivedAction": "Mostrar carpetas activas",
    "bookmarks.confirmImport": "Confirmar importación",
    "bookmarks.backupTitle": "Respaldo y restauración",
    "bookmarks.backupDescription":
      "Guardá una copia en archivo de tus carpetas o restaurá una que hayas exportado antes.",
    "bookmarks.saveFile": "Guardar archivo",
    "bookmarks.restoreFile": "Restaurar desde archivo",
    "bookmarks.folderCopyTitle": ({ title }) => `${title} (copia)`,
    "confirm.cancel": "Cancelar",
    "confirm.delete": "Eliminar",
    "confirm.deleteFolderTitle": "¿Eliminar carpeta?",
    "confirm.deleteFolderMessage": ({ title }) =>
      `Esto eliminará permanentemente "${title}" y todos los trades guardados dentro.`,
    "confirm.deleteTradeTitle": "¿Eliminar trade guardado?",
    "confirm.deleteTradeMessage": ({ title }) =>
      `Esto eliminará permanentemente "${title}" de la carpeta.`,
    "history.clear": "Borrar historial",
    "history.cleared": "¡Historial borrado!",
    "history.empty": ({ version }) =>
      `El historial está vacío para PoE ${version}.`,
    "history.emptyDescription":
      "Tus búsquedas recientes de trade van a aparecer acá cuando las abras desde el sitio oficial.",
    "history.untitledSearch": "Búsqueda sin título",
    "history.today": "Hoy",
    "history.yesterday": "Ayer",
    "history.standardLeague": "Standard",
    "folder.metaSeparator": " • ",
    "folder.copiedTrade": ({ title }) => `Se copió ${title} al portapapeles`,
    "folder.copyTradeError": "No se pudo copiar la URL del trade.",
    "folder.duplicatedTrade": ({ title }) => `Se duplicó ${title}`,
    "folder.invalidTradePage": "No estás en una página válida de trade",
    "folder.missingTradeType":
      "Falta el tipo de trade para la búsqueda actual.",
    "folder.addedToFolder": ({ title }) => `Se agregó "${title}" a la carpeta`,
    "folder.tradeFallback": "Trade",
    "folder.copiedFolder":
      "¡Los datos de la carpeta se copiaron al portapapeles!",
    "folder.copyFolderError": "No se pudieron copiar los datos de la carpeta.",
    "folder.renamedFolder": ({ title }) =>
      `La carpeta se renombró a "${title}"`,
    "folder.renamedSearch": ({ title }) =>
      `La búsqueda se renombró a "${title}"`,
    "folder.updatedSearchLocation": ({ title }) =>
      `Se actualizó la ubicación de búsqueda de "${title}"`,
    "folder.dragReorder": "Arrastrar para reordenar carpeta",
    "folder.collapse": "Colapsar",
    "folder.expand": "Expandir",
    "folder.editFolder": "Editar carpeta",
    "folder.restoreFolder": "Restaurar carpeta",
    "folder.archiveFolder": "Archivar carpeta",
    "folder.exportFolder": "Exportar carpeta",
    "folder.deleteFolder": "Eliminar carpeta",
    "folder.dragTrade": "Arrastrar para reordenar",
    "folder.editSearchName": "Editar nombre de búsqueda",
    "folder.replaceCurrentSearch": "Reemplazar con búsqueda actual",
    "folder.copyUrl": "Copiar URL",
    "folder.openLiveSearch": "Abrir búsqueda live",
    "folder.markPending": "Marcar como pendiente",
    "folder.markComplete": "Marcar como completada",
    "folder.deleteTrade": "Eliminar trade",
    "folder.actionsMenu": "Más acciones",
    "folder.renameFolder": "Renombrar carpeta",
    "folder.chooseIcon": "Elegí un ícono para la carpeta",
    "folder.noIcon": "Sin ícono",
    "folder.duplicateFolder": "Duplicar carpeta",
    "folder.duplicatedFolder": ({ title }) => `Carpeta "${title}" duplicada`,
    "folder.saveFolderChanges": "Guardar carpeta",
    "folder.saveCurrentSearch": "Guardar búsqueda actual",
    "folder.loadTradesError": "No se pudieron cargar los trades.",
    "folder.deleteTradeError": "No se pudo eliminar el trade.",
    "folder.duplicateTradeError": "No se pudo duplicar el trade.",
    "folder.duplicateFolderError": "No se pudo duplicar la carpeta.",
    "finer.title": "Agregar a filtros",
    "finer.modifiers": "Modificadores",
    "finer.pseudoResLife": "Pseudo Res/Vida",
    "finer.explicitResLife": "Res/Vida explícita",
    "finer.attackWeapon": "Arma de ataque",
    "finer.spellWeapon": "Arma de hechizos"
  } as Record<string, TranslationValue>
