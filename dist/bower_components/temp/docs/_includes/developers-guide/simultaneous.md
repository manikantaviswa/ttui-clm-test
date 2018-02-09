<h1 class="page-header">Simultaneous development with another project</h1>

This technique may be useful if you want to observe in real time how library changes affect some other project. It for developers' convenience only, and after finishing a new library feature you should go through the formal deployment process as described in the next chapter. 

## Linking ui-lib locally

1. In your *ui-lib* workspace, run build task to prepare distribution files:
  
		grunt build
2. `bower link` will register the package as available to be linked. It will have no effect anywhere else, yet:

		bower link
3. Go to your current project (eg. tecnotree-clm-ui) and navigate to the directory containing *bower.json* file with *tecnotree-ui-library* in the 'dependencies' section. Type:

		bower link tecnotree-ui-library
4. A symlink *~tecnotree-clm-ui* should appear in bower_components folder. Now all changes in UI Library will be reflected immediately to the current project. 

## Removing a link

When the link is no longer necessary, simply remove it with: 

	bower uninstall tecnotree-ui-library

## Watching changes

It depends on your build tool whether you see library file changes immediately or not. In case your project utilizes some file watcher (eg. grunt watch) you should also open an another terminal, navigate to the UI library project and run:

	grunt build
	grunt serve:quickdist
		
Please note that *quickdist* task is optimized for speed and doesn't perform all tasks, so you should run `grunt build` at least when starting a new feature and after any significant change in the UI Library.