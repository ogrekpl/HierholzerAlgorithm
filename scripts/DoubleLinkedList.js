/**
 * Double linked list representation
 */
class DoubleLinkedList
{
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * Adds a new node to the head of the list
     * @param {*} value node value
     */
    addToHead(value) {
        const newNode = new MyNode(value);
        if(this.length === 0)
        {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head.previous = newNode;
            this.head = newNode;
        }
        this.length += 1;
        return newNode;
    }

    /**
     * Removes and returns the element from the head of the list
     */
    popHead() {
        if(this.length === 0)
        {
            return null;
        }

        const nodeToRemove = this.head;

        if(this.length === 1)
        {
            this.head = null;
            this.tail = null;
        }
        else {
            this.head = nodeToRemove.next;
            this.head.previous = null;
            nodeToRemove.next = null;
        }

        this.length -= 1;
        return nodeToRemove;
    }
    addToVertex(value, vertex)
    {
        const newNode = new MyNode(value);
        newNode.next = vertex.next;
        if(newNode.next !== null)
        {
            vertex.next.previous = newNode;
        }
        newNode.previous = vertex;
        vertex.next = newNode;
        this.length +=1;
    }
    removeVertex(vertex)
    {
        if (vertex.next !== null) vertex.next.previous = vertex.previous;
        if (vertex.previous !== null) vertex.previous.next = vertex.next;
        vertex.previous = null;
        vertex.next = null;
        vertex = null;
        this.length -=1;
    }
    /**
     * Adds a new node to the tail of the list
     * @param {*} value node value 
     */
    addToTail(value) {
        const newNode = new MyNode(value);
        if(this.length === 0)
        {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            newNode.previous = this.tail;
            this.tail = newNode;
        }

        this.length += 1;

        return newNode;
    }

    /**
     * Removes and returns the element from the tail of the list
     */
    popTail() {
        if(this.length === 0)
        {
            return null;
        }
        else {
            const nodeToRemove = this.tail;
            
            if(this.length === 1)
            {
                this.head = null;
                this.tail = null;
            } else {
                // first we set the tail's previous as the new tail
                this.tail = this.tail.previous;
                // then we break the links of the old tail to the list 
                this.tail.next = null;
                nodeToRemove.previous = null;
            }

            this.length -= 1;

            return nodeToRemove;
        }
    }
    /**
     * Returns an element at the given index in the list
     * @param {number} index index of the element to be returned
     */
    get(index) {
        if(this.length === 0 || index < 0 || index >= this.length)
        {
            return null;
        }
        else
        {
            let currentNode;
            // the next if else is for optimisation
            if(index < this.length/2)
            {
                let i = 0;
                currentNode = this.head;

                while(i<index)
                {
                    currentNode = currentNode.next;
                    i += 1;
                }
            }
            else {
                let i = this.length - 1;
                currentNode = this.tail;

                while(i>index)
                {
                    currentNode = currentNode.previous;
                    i -= 1;
                }
            }

            return currentNode;
        }
    }
    /**
     * Sets the value of the element at the given index in the list
     * @param {number} index 
     * @param {*} value 
     */
    set(index,value) {
        const updatedNode = this.get(index);

        if(updatedNode !== null)
        {
            updatedNode.value = value;

            return updatedNode;
        }

        return null;
    }

    /**
     * Inserts an element at the given index inside the list
     * @param {number} index 
     * @param {*} value 
     */
    insertAt(index, value) {
        if(index < 0 || index > this.length)
        {
            return null;
        }
        else if (index === 0) {
            return this.addToHead(value);
        }
        else if (index === this.length) {
            return this.addToTail(value);
        }

        else {
            const newNode = new MyNode(value);

            const newPrevNode = this.get(index-1);
            const newNextNode = newPrevNode.next;

            newPrevNode.next = newNode;
            newNode.previous = newPrevNode;

            newNode.next = newNextNode;
            newNextNode.previous = newNode;

            this.length += 1;
            return newNode;
        }
    }
    /**
     * Removes an element at the given index inside the list
     * @param {number} index 
     */
    removeAt(index) {
        if(this.length === 0 || index < 0 || index >= this.length) {
            return null;
        }
        else if (index === 0) {
            return this.popHead();
        }
        else if (index === this.length - 1) {
            return this.popTail();
        }
        else {
            const nodeToRemove = this.get(index);
            const previousNode = nodeToRemove.previous;
            const nextNode = nodeToRemove.next;

            previousNode.next = nextNode;
            nextNode.previous = previousNode;

            nodeToRemove.previous = null;
            nodeToRemove.next = null;

            this.length -= 1;

            return nodeToRemove;
        }
    }

    /**
     * Prints the list in string format (console)
     */
    printList() {
        let tempNode = this.head;
        let listString = "";
        while(tempNode !== null)
        {
            listString = listString + tempNode.value + " ";
            tempNode = tempNode.next;
        }
        console.log(listString);
    }

}