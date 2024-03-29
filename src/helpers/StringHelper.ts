
export class StringHelper {
    /**Metodo che ritorna true se la stirnga passata come parametro contiene soli numeri, false altrimenti */
     static hasOnlyNumbers(param): boolean {
        const hasnums = /^\d+$/.test(param);
        return hasnums;
    }

    /** Method deleting the last char of the given word. */ 
    static deleteLastChar(word: string): string {
        word = word.substring(0, word.length-1)
        return word;
    }

    /**
   * Method building a string containing the equivalent
   * time specified from the given milliseconds.
   * @param ms specified milliseconds
   * @returns formatted string
   */
    static msToTime(milliseconds){
        //Get hours from milliseconds
        var hours = milliseconds / (1000*60*60);
        var absoluteHours = Math.floor(hours);
        var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
        
        //Get remainder from hours and convert to minutes
        var minutes = (hours - absoluteHours) * 60;
        var absoluteMinutes = Math.floor(minutes);
        var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
        
        //Get remainder from minutes and convert to seconds
        var seconds = (minutes - absoluteMinutes) * 60;
        var absoluteSeconds = Math.floor(seconds);
        var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
        
        return h + ':' + m + ':' + s;
    }
    
}
