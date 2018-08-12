#include <stdlib.h>
#include <stdio.h>
#include <string.h>



#define MAX_LNAME_LENGTH 21
#define MAX_PATH_LENGTH 1001

typedef struct _dir dir;

struct _dir{
	char type;
	int lenght;
	dir * parent;
	char name[21];
	dir * list[21];
};

void ls(dir * d){
	int x = 0;
	while(d->lenght > x){
		printf("%c %s\n",d->list[x]->type,d->list[x]->name);
		x++;
	}
}

void pwd(dir * d){
	if(d == NULL)
		return;
	pwd(d->parent);
	if(strcmp(d->name, "") == 0)
		return;
	printf("/%s",d->name);
}


int compareDir(dir * a, dir * b){
	if(b->type < a->type)
		return 1;
	if(b->type > a->type)
		return 0;
	return compare(a->name,b->name);
}

int compare(char * a, char * b){
	if(*a == *b)
		return (compare(a + 1, b + 1));
	if(*a == '\0') return 0;
	if(*b == '\0') return 1;
	
	if(*a == '.') return 0;
	if(*b == '.') return 1;
	
	if(*a == '-') return 0;
	if(*b == '-') return 1;
	
	if(*a == '_') return 0;
	if(*b == '_') return 1;
	
	if(*a > *b)
		return 1;
	else
		return 0;
	
	
}

dir * insertHelp(dir * parent, dir * new, int x){
	if(x == parent->lenght){
		parent->list[x] = new;
		return parent;
	}else{
		dir * temp = parent->list[x];
		parent->list[x] = new;
		return insertHelp(parent, temp, x + 1);
	}
}

dir * insertDir(dir * parent, dir * new){
	int x = 0;

	while(parent->lenght > x){

		if(compareDir(parent->list[x], new) == 1){
			parent = insertHelp(parent, new, x);
			parent->lenght += 1;
			return parent;
		}
		x++;
	}
	parent->list[x] = new;
	
	
	parent->lenght += 1;
	return parent;
}

dir * mkdir(dir * parent, char type, char * name){
	dir * new = (dir *)malloc(sizeof(dir));
	new->lenght = 0;
	new->type = type;
	new->parent = parent;
	strcpy(new->name, name);
	return insertDir(parent, new);
}

dir * enter(dir * current, char * path, int * found, int talk, int force){
	char * name;
	char * temp;
	char s[2] = "/";
	char newPath[1001];
	int x;
	strcpy(newPath, path);
	name = strtok(newPath, s);
	temp = name;
	if(name == NULL)
		*found = 1;
	while(name != NULL){
		//printf("token: %s\n",name);
		if(strcmp(name, ".") == 0 || strcmp(name, ". ") == 0){
			*found = 1;
		}else if(strcmp(name, "..") == 0 || strcmp(name, ".. ") == 0){
			if(current->parent != NULL)
				current = current->parent;
			*found = 1;
		}else{
			
			//*found = 0;
			for(x = 0; x < current->lenght; x++){
				//printf("name: %s\n",current->list[x]->name);
				if(strcmp(current->list[x]->name, name) == 0){
					if(current->list[x]->type == 'F' && force != 1){
						*found = 2;
						break;
					}else{
						current = current->list[x];
						*found = 1;
						break;
					}
				}
			}
			temp = name;
			if(*found == 0)
				break;
			
		}
		
		name = strtok(NULL, "/");
	}
	if(*found == 0 && talk == 1){
		printf("Path Error: directory '/%s' does not exist.\n", temp);
	}
	return current;
}


void find(char * n, dir * d){
	int x;
	for(x = 0; x < d->lenght; x++){
		if(d->list[x]->type == 'D'){
			if(strstr(d->list[x]->name, n) != NULL){
				printf("D ");
				pwd(d->list[x]);
				printf("\n");
			}
			find(n, d->list[x]);
		}else{
			if(strstr(d->list[x]->name, n) != NULL){
				printf("F ");
				pwd(d->list[x]);
				printf("\n");
			}
		}
	}
}

void removeDir(dir * parent, dir * child){
	dir * temp;
	int x = 0;
	while(x < parent->lenght){
		if(parent->list[x] == child){
			//printf("deleting: %s\n", parent->list[x]->name);
			while(x < parent->lenght - 1){
				parent->list[x] = parent->list[x + 1];
				x++;
			}
		}
		x++;
	}
	//parent[x] = NULL;
	parent->lenght -= 1;
}




int main(int argc, char ** argv){
	char command[1001];
	char * list;
	//char command2[1001];
	
	dir * root = (dir *)malloc(sizeof(dir));
	root->lenght = 0;
	root->type = 'D';
	root->parent = NULL;
	strcpy(root->name, "");
	
	
	dir * current = root;
	dir * temp;
	int a = 0;
	int * found = &a;
	char * token;
	
	while(fgets(command, 1001, stdin) > 0){
		//printf("comand: %s\n",command);
		if(strncmp(command, "pwd", 3) == 0){
			if(strcmp(current->name, "") == 0)
				printf("/");
			
			pwd(current);
			printf("\n");
			
		}else if(strcmp(command, "ls\n") == 0){
			if(strcmp(current->name, "") == 0)
				printf("Listing For '/");
			else
				printf("Listing For '");
			pwd(current);
			printf("':\n");
			ls(current);
			
		}else if(strncmp(command, "ls ", 3) == 0){
			list = command + 3;
			strtok(list, "\n");	
			if(list[0] == '/'){
				//printf("Listing For '%s':\n",list);
				temp = root;
				
			}else{
				//printf("Listing For '");
				//pwd(current);
				//printf("%s':\n",list);
				temp = current;
			}
			
			char * dirs[21];
			int x = 0;
			token = strtok(list, "/");
			while(token != NULL){
				//printf("token: %s\n", token);
				dirs[x] = malloc(sizeof(char) * 21);
				strcpy(dirs[x],token);
				//printf("found token: %s\n",token);
				token = strtok(NULL, "/");
				x++;
			}
			int y;
			for(y = 0; y < x; y++){
				*found = 0;
				temp = enter(temp, dirs[y], found, 0, 0);
				if(*found == 0){
					printf("Path Error: directory '/%s' does not exist.\n", dirs[y]);
					printf("List Error: Cannot perform list operation.\n");
					break;
				}
			}
			if(*found == 1){
				printf("Listing For '");
				if(strcmp(temp->name, "") == 0)
					printf("/");
				
				pwd(temp);
				printf("':\n");
			
				ls(temp);
			}
			
		}else if(strncmp(command, "mkdir ", 6) == 0){
			list = command + 6;
			strtok(list, "\n");			
			//current = mkdir(current, 'D', list);
			
			token = strtok(list, "/");
			if(list[0] == '/')
				temp = root;
			else
				temp = current;
			
			char * dirs[21];
			int x = 0;
			while(token != NULL){
				//printf("token: %s\n", token);
				dirs[x] = malloc(sizeof(char) * 21);
				strcpy(dirs[x],token);
				token = strtok(NULL, "/");
				x++;
			}
			int y;
			for(y = 0; y < x; y++){
				//printf("adding: %s\n",dirs[y]);
				*found = 0;
				temp = enter(temp, dirs[y], found, 0, 0);
				if(*found == 2 && y != x - 1){
					printf("Path Error: Cannot create sub-directory content. '/%s' is a file.\n", dirs[y]);
					printf("Make Dir Error: Cannot create directory.\n");
					break;
				}
				//printf("found: %d\n", *found);
				if(*found == 0){
					temp = mkdir(temp, 'D', dirs[y]);
					temp = enter(temp, dirs[y], found, 0, 0);
				}else if((*found == 1 || *found == 2) && y == x - 1){
					printf("Path Error: '/%s' already exists and cannot be created.\n", dirs[y]);
					printf("Make Dir Error: Cannot create directory.\n");
				}
			}
			
			
		}else if(strncmp(command, "touch ", 6) == 0){
			list = command + 6;
			strtok(list, "\n");			
			//current = mkdir(current, 'D', list);
			
			token = strtok(list, "/");
			if(list[0] == '/')
				temp = root;
			else
				temp = current;
			
			char * dirs[21];
			int x = 0;
			while(token != NULL){
				//printf("token: %s\n", token);
				dirs[x] = malloc(sizeof(char) * 21);
				strcpy(dirs[x],token);
				token = strtok(NULL, "/");
				x++;
			}
			int y;
			for(y = 0; y + 1 < x; y++){
				//printf("adding: %s\n",dirs[y]);
				*found = 0;
				temp = enter(temp, dirs[y], found, 0, 0);
				if(*found == 2){
					printf("Path Error: Cannot create sub-directory content. '/%s' is a file.\n", dirs[y]);
					printf("Touch Dir Error: Cannot create directory.\n");
					break;
				}
				if(*found == 0){
					temp = mkdir(temp, 'D', dirs[y]);
					temp = enter(temp, dirs[y], found, 0, 0);
				}
			}
			*found = 0;
			temp = enter(temp, dirs[y], found, 0, 0);
			if(*found == 0){
				temp = mkdir(temp, 'F', dirs[y]);
			}else if(*found == 1 || *found == 2){
				printf("Path Error: '/%s' already exists and cannot be created.\n", dirs[y]);
				printf("Touch Error: Cannot create file.\n");

			}
			
		}else if(strncmp(command, "cd ", 3) == 0){
			list = command + 3;
			strtok(list, "\n");
			temp = current;
			*found = 0;
			if(list[0] == '/')
				temp = enter(root, list + 1, found, 1, 0);
			else
				temp = enter(current, list, found, 1, 0);
			if(*found == 2 || *found == 0){
				printf("Change Dir Error: Cannot change working directory.\n");
			}else{
				current = temp;
			}
			
		}else if(strncmp(command, "find ", 5) == 0){
			list = command + 5;
			strtok(list, "\n");
			printf("Searching For '%s':\n",list);
			find(list, root);
			
		}else if(strncmp(command, "rm ", 3) == 0){
			list = command + 3;
			strtok(list, "\n");
			temp = current;
			int force;
			if(strncmp(list, "-f ", 3) == 0){
				force = 3;
				//list = list + 3;
				//printf("");
				//printf("%s\n",command);
			}else{
				//printf("%s\n",command);
				force = 0;
			}
			*found = 0;
			//if(strcmp(list + force, "dir2") == 0)
			//	printf("match at: place\n");	
			if(list[0 + force] == '/')
				temp = enter(root, list + 1 + force, found, 1, 1);
			else
				temp = enter(current, list + force, found, 1, 1);
			
			
			
			
			if(*found == 1){
				if(temp->lenght != 0 && force == 0){
					printf("Remove Error: directory '");
					pwd(temp);
					printf("' is not empty.\n");
				}else{
					//if(strcmp(temp->name, "1") == 0)
					//	printf("1\n");
					removeDir(temp->parent, temp);
					//printf("removed: %s\n", temp->name);
				}
			}
		}
	}
}